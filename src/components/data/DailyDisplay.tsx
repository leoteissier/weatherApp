import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { convertUnixTimeToDay } from "../../utils/units";
import GlobalStyles from "../../assets/styles/globalStyles";

// Define the type for your props
type DailyDisplayProps = {
    dailyData: Array<{
        date: string; // assuming each entry has a date
        maxTemp: number; // max temperature
        minTemp: number; // min temperature
    }>;
};

const DailyDisplay = ({ dailyData }: DailyDisplayProps) => {

    if (!dailyData || dailyData.length === 0) {
        return <View style={GlobalStyles.loadingContainer}>
            <Text style={GlobalStyles.text}>Loading...</Text>
        </View>;
    }

    return (
        <View style={styles.container}>
            {dailyData.list.map((day, index) => (
                <View key={index} style={styles.item}>
                    <Text style={GlobalStyles.text}>{convertUnixTimeToDay(day.dt)}: {day.temp.max}° / {day.temp.min}°</Text>
                </View>
            ))}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#323232',
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
    },
    item: {
        margin: 8,
    },
});

export default DailyDisplay;
