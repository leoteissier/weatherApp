import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

type humidityProps = {
    humidity: number;
};

const humidityDisplay = ({ humidity }: humidityProps) => {
    if (!humidity) {
        return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Text>Humidity</Text>
            <Text>{humidity} %</Text>
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
        width: '100%',
        paddingTop: 30,
    }
});

export default humidityDisplay;