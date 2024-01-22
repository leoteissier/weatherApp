import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchDailyWeatherData, fetchHourlyWeatherData } from "../services/weatherServices";

import CurrentDisplay from "../components/data/CurrentDisplay";
import HourlyDisplay from "../components/data/HourlyDisplay";
import DailyDisplay from "../components/data/DailyDisplay";

import { globalStyles } from "../assets/styles/globalStyles";
import { getCities } from "../utils/storage";
import { roundObjectValues } from "../utils/units";

const WeatherView = ({ route }) => {
    const { city, currentData } = route.params || {}
    const [weatherData, setWeatherData] = useState(null)
    const navigation = useNavigation()

    // Vérification des villes enregistrées si aucune ville n'est enregistrée, redirection vers CitiesView
    useEffect(() => {
        // Check for saved cities
        const checkCities = async () => {
            const savedCities = await getCities();
            console.log(savedCities);
            if (!savedCities || savedCities.length === 0) {
                console.log('No cities saved');
                // No cities saved, redirect to CitiesView
                navigation.navigate('Cities');
            }
        };

        checkCities();
    }, [navigation]);

    // Récupération des données météorologiques
    const getWeatherData = async (cityName: string) => {
        try {
            const HourlyData = await fetchHourlyWeatherData(cityName);
            const DailyData = await fetchDailyWeatherData(cityName);

            // Arrondir pour CurrentData
            roundObjectValues(currentData);

            // Arrondir pour DailyData
            DailyData.list.forEach(item => {
                roundObjectValues(item.temp);
            });

            // Arrondir pour HourlyData
            HourlyData.list.forEach(item => {
                roundObjectValues(item.main);
            });

            console.log('DailyData: ', DailyData);
            console.log('HourlyData: ', HourlyData);
            console.log('CurrentData: ', currentData);

            setWeatherData({
                current: currentData,
                hourly: HourlyData,
                daily: DailyData,
            })
        } catch (error) {
            console.error(error);
        }
    };

    // si city est défini, on récupère les données météorologiques
    useEffect(() => {
        if (city) {
            console.log('Fetching weather data for', city);
            getWeatherData(city);
        }
    }, [city]);

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
                        <ScrollView style={styles.containerMobile}>
                            <CurrentDisplay current={weatherData.current} />
                            <HourlyDisplay hourlyData={weatherData.hourly} />
                            <DailyDisplay dailyData={weatherData.daily} />
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
        paddingTop: 30,
    },
});

export default WeatherView;
