import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from "react-native";
const MapView = () => {
    // if (!weatherData) {
    //     return <View style={globalStyles.loadingContainer}><Text>Loading...</Text></View>;
    // }

    return (
        <View style={styles.container}>
            <Text>MapScreen</Text>
        </View>
    )
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 50,
    },
})

export default MapView;