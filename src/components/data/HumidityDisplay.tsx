import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import globalStyles from "../../assets/styles/globalStyles";

type humidityProps = {
    humidity: number;
};

const humidityDisplay = ({ humidity }: humidityProps) => {
    if (!humidity) {
        return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Text style={globalStyles.text}>Humidity</Text>
            <Text style={globalStyles.text}>{humidity} %</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(50,50,50,0.5)',
        marginRight: 5,
        padding: 20,
        borderRadius: 10,
    }
});

export default humidityDisplay;