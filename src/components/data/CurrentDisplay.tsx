import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CurrentWeatherData = {
    main: {
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    weather: Array<{
        description: string;
    }>;
};

type CurrentDisplayProps = {
    current: CurrentWeatherData;
};

const CurrentDisplay: React.FC<CurrentDisplayProps> = ({ current }) => {
    const { main: { temp, temp_max, temp_min }, weather } = current;
    const description = weather[0].description;


    return (
        <View style={styles.container}>
            <Text style={styles.temperature}>{temp}°</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.maxMin}>
                <Text style={styles.description}>{temp_max}°</Text>
                <Text style={styles.description}> {temp_min}°</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        padding: 10,
    },
    temperature: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 18,
        color: '#fff',
    },
    maxMin: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default CurrentDisplay;
