import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherView from '../views/WeatherView';
import CitiesView from '../views/CitiesView';
import MapView from '../views/MapView';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Weather" component={WeatherView} />
                <Stack.Screen name="Cities" component={CitiesView} />
                <Stack.Screen name="Map" component={MapView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
