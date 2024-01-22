import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { fetchCurrentWeatherData } from '../services/weatherServices';
import { getCities, saveCity, deleteCity } from '../utils/storage';
import { roundObjectValues } from "../utils/units";
import { globalStyles } from "../assets/styles/globalStyles";

type CityWeatherData = {
    city: string;
    weatherData: {
        main: {
            temp: number;
            temp_max: number;
            temp_min: number;
        };
        weather: Array<{
            main: string;
            description: string;
        }>;
        timezone: number;
    };
};

const CitiesView = () => {
    const [cities, setCities] = useState<CityWeatherData[]>([])
    const [input, setInput] = useState<string>('')
    const [currentTime, setCurrentTime] = useState(new Date())
    const navigation = useNavigation()

    // Fetch cities from storage
    const fetchCities = async () => {
        try {
            const savedCities = await getCities()
            if (savedCities) {
                const citiesWithWeather = await Promise.all(savedCities.map(async city => {
                    const weatherData = await fetchCurrentWeatherData(city) // fetch weather data for each city
                    roundObjectValues(weatherData.main); // round values
                    return { city, weatherData } // return an object with city name and weather data
                }));
                setCities(citiesWithWeather);
            }
        } catch (error) {
            console.error(error)
        }
    };

    // Actualisation des données météorologiques lors de la construction du composant
    useEffect(() => {
        fetchCities();
    }, []);

    // Save city to storage
    const handleSaveCity = async () => {
        const cityExists = cities.some(cityData => cityData.city.toLowerCase() === input.toLowerCase());

        if (!cityExists) {
            try {
                const weatherData = await fetchCurrentWeatherData(input);
                roundObjectValues(weatherData.main); // round values
                await saveCity({ city: input });
                setCities([...cities, { city: input, weatherData }]);
            } catch (error) {
                // Afficher un toast en cas d'erreur lors de la récupération des données météorologiques
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: `Impossible de récupérer les données pour la ville : ${input}`
                });
                // console.error(error);
            }
        } else {
            // Afficher un message toast si la ville existe déjà
            Toast.show({
                type: 'info',
                text1: 'La ville existe déjà',
                text2: 'Veuillez entrer une autre ville.'
            });
            // console.error('La ville existe déjà')
        }
        setInput('');
    };

    // Delete city from storage
    const handleDeleteCity = async (city: string) => {
        await deleteCity(city)
        setCities(cities.filter(c => {
            return c.city !== city
        }))
    };

    const renderRightActions = (city) => {
        return (
            <TouchableOpacity
                onPress={() => handleDeleteCity(city)}
                style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>
        );
    };

    // Get local time from timezone offset
    const getLocalTime = (timezoneOffset: number) => {
        const localTime = new Date(currentTime.getTime() + timezoneOffset * 1000);
        return `${localTime.getUTCHours()}:${localTime.getUTCMinutes()}`;
    };

    // Actualisation de l'heure locale toutes les minutes
    useEffect(() => {
        // Met à jour l'heure actuelle
        const updateCurrentTime = () => {
            setCurrentTime(new Date());
        };

        // Calcule le temps restant jusqu'à la prochaine minute pleine
        const now = new Date();
        const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        // Définit un timeout pour synchroniser avec la minute suivante
        const timeout = setTimeout(() => {
            updateCurrentTime();
            // Définit un intervalle qui se répète toutes les minutes
            const interval = setInterval(updateCurrentTime, 60000);
            return () => clearInterval(interval);
        }, msUntilNextMinute);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <GestureHandlerRootView style={styles.cityScreen}>
            <Text style={globalStyles.titleText}>Meteo</Text>
            <TextInput
                style={styles.input}
                onChangeText={setInput}
                value={input}
                placeholder="Ville ou Aéroport"
                placeholderTextColor="white"
                onSubmitEditing={handleSaveCity}
            />
            <ScrollView>
                {cities.map((cityData, index) => {
                    const { temp, temp_max, temp_min } = cityData.weatherData.main;
                    const weatherDescription = cityData.weatherData.weather[0].description;
                    const localTime = getLocalTime(cityData.weatherData.timezone);
                    return (
                        <View key={index} style={styles.item}>
                            <Swipeable
                                key={index}
                                renderRightActions={() => renderRightActions(cityData.city)}
                            >
                                <TouchableOpacity onPress={() => navigation.navigate('Weather', {
                                    city: cityData.city,
                                    currentData: cityData.weatherData
                                })}>
                                    <View style={styles.itemTop}>
                                        <View>
                                            <Text style={styles.titleText}>{cityData.city}</Text>
                                            <Text style={globalStyles.text}>{localTime}</Text>
                                        </View>
                                        <View>
                                            <Text style={globalStyles.text}>{temp}°</Text>
                                        </View>
                                    </View>
                                    <View style={styles.itemBot}>
                                        <Text style={globalStyles.text}>{weatherDescription}</Text>
                                        <View style={styles.itemBotRight}>
                                            <Text style={globalStyles.text}>max {temp_max}°</Text>
                                            <Text style={globalStyles.text}>min {temp_min}°</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Swipeable>
                        </View>
                    );
                })}
            </ScrollView>
            <Toast />
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    cityScreen: {
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
        paddingTop: 70,
        paddingLeft: 20,
        paddingRight: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#323232',
        color: 'white',
        marginBottom: 20,
        padding: 10,
        fontSize: 18,
        borderRadius: 12,
    },
    item: {
        width: '100%',
        backgroundColor: '#323232',
        marginBottom: 10,
        padding: 20,
        fontSize: 18,
        borderRadius: 12,
    },
    itemTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemBot: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemBotRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    titleText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
    },
    deleteButtonText: {
        color: 'white',
    },
})

export default CitiesView;
