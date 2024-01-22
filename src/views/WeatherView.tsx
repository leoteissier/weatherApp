import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchCurrentWeatherData, fetchDailyWeatherData, fetchHourlyWeatherData } from "../services/weatherServices";

import CurrentDisplay from "../components/data/CurrentDisplay";
import HourlyDisplay from "../components/data/HourlyDisplay";
import DailyDisplay from "../components/data/DailyDisplay";

import WindDisplay from "../components/data/WindDisplay";
import HumidityDisplay from "../components/data/HumidityDisplay";
import PressureDisplay from "../components/data/PressureDisplay";

import { getCities } from "../utils/storage";
import { roundObjectValues } from "../utils/units";

import globalStyles from "../assets/styles/globalStyles";

const WeatherView = ({ route }) => {
    const { city: paramCity, currentData: paramCurrentData } = route.params || {};
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState(paramCity || null);
    const navigation = useNavigation();

    // Vérification des villes enregistrées si aucune ville n'est enregistrée, redirection vers CitiesView

    useEffect(() => {
        if (paramCity && paramCurrentData) {
            // Utilisez les données passées via la navigation
            getWeatherData(paramCity);
        } else {
            // Sinon, vérifiez les villes enregistrées
            const checkCities = async () => {
                const savedCities = await getCities();
                if (!savedCities || savedCities.length === 0) {
                    navigation.navigate('Cities');
                } else {
                    setCity(savedCities[0]);
                    getWeatherData(savedCities[0]);
                }
            };
            checkCities();
        }
    }, [paramCity, paramCurrentData, navigation]);

    // Récupération de toutes les données météorologiques (actuelles, horaires et quotidiennes)
    const getWeatherData = async (cityName: string) => {
        try {
            const currentWeatherData = await fetchCurrentWeatherData(cityName);
            const hourlyWeatherData = await fetchHourlyWeatherData(cityName);
            const dailyWeatherData = await fetchDailyWeatherData(cityName);

            roundObjectValues(currentWeatherData.main);
            hourlyWeatherData.list.forEach(item => roundObjectValues(item.main));
            dailyWeatherData.list.forEach(item => roundObjectValues(item.temp));

            setWeatherData({
                current: currentWeatherData,
                hourly: hourlyWeatherData,
                daily: dailyWeatherData,
            });
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        if (city) {
            getWeatherData(city)
        }
    }, [city])

    return (
        <View style={globalStyles.screen}>
            <View style={globalStyles.container}>
                {!weatherData ? (
                    <View>
                        <Text>Loading...</Text>
                        <Text>{city}</Text>
                    </View>
                ) : (
                    <>
                        <View style={styles.containerImmobile}>
                            <Text style={globalStyles.titleText}>{weatherData.current.name}</Text>
                        </View>
                        <ScrollView style={styles.containerMobile} showsVerticalScrollIndicator={false}>
                            <CurrentDisplay current={weatherData.current} />
                            <HourlyDisplay hourlyData={weatherData.hourly} />
                            <DailyDisplay dailyData={weatherData.daily} />
                            <WindDisplay wind={weatherData.current.wind} />
                            <View style={globalStyles.componentDouble}>
                                <HumidityDisplay humidity={weatherData.current.main.humidity} />
                                <PressureDisplay pressure={weatherData.current.main.pressure} />
                            </View>
                        </ScrollView>
                    </>
                )}
            </View>
            <View style={globalStyles.navbar}>
                <Button onPress={() => navigation.navigate('Map', {name: 'Map'})} title="Map" />
                <Button onPress={() => navigation.navigate('Cities', {name: 'Cities'})} title="Cities" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerImmobile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
    containerMobile: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        marginTop: 40,
    },
});

export default WeatherView;
