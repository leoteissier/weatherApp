import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from "../../assets/styles/globalStyles";

type WindProps = {
    wind: {
        deg: number;
        speed: number;
    };
};

const WindDisplay = ({ wind }: WindProps) => {
    console.log('Wind: ', wind);
    if (!wind || !wind.deg || !wind.speed) {
        return <View style={globalStyles.loadingContainer}><Text>Loading...</Text></View>;
    }

    return (
        <View style={globalStyles.componentSimple}>
            <Text style={globalStyles.text}>Wind</Text>
            <View>
                <Text style={globalStyles.text}>Direction: {wind.deg}°</Text>
                <Text style={globalStyles.text}>Speed: {wind.speed} km/h</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default WindDisplay;
