import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { convertUnixTimeToDay } from "../../utils/units";
import globalStyles from "../../assets/styles/globalStyles";

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
        return <View style={globalStyles.loadingContainer}>
            <Text style={globalStyles.text}>Loading...</Text>
        </View>;
    }

    return (
        <View style={styles.container}>
            {dailyData.list.map((day: object, index: number) => (
                <View key={index} style={styles.item}>
                    <Text style={globalStyles.text}>{convertUnixTimeToDay(day.dt)}: {day.temp.max}° / {day.temp.min}°</Text>
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
        backgroundColor: 'rgba(50,50,50,0.5)',
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
