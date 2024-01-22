import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import GlobalStyles from "../../assets/styles/globalStyles";
import { convertUnixTimeToHour } from "../../utils/units";

// Define the type for your props
type HourlyDisplayProps = {
    hourlyData: Array<{
        time: string; // assuming each entry has a time
        temperature: number; // and a temperature
    }>;
};

const HourlyDisplay = ({ hourlyData }: HourlyDisplayProps) => {

    if (!hourlyData || hourlyData.length === 0) {
        return <View style={GlobalStyles.loadingContainer}>
            <Text style={GlobalStyles.text}>Loading...</Text>
        </View>;
    }

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
        >
            <View style={styles.container}>
                {hourlyData.list.map((hour: any, index: number) => (
                    <View key={index} style={styles.component}>
                        <Text style={styles.element}>{convertUnixTimeToHour(hour.dt)}</Text>
                        <Text style={styles.element}>{hour.main.temp}°</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    scrollContainer: {
        width: '100%',
        height: 100,
        marginBottom: 10,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(50,50,50,0.5)',
        width: '100%',
        height: '100%',
        padding: 10,
    },
    component: {
       marginRight: 8,
    },
    element: {
        fontSize: 18,
        color: '#fff',
    }
});

export default HourlyDisplay;
