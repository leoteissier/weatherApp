import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

// Define the type for your props
type pressureProps = {
    pressure: number;
};

const pressureDisplay = ({ pressure }: pressureProps) => {
    if (!Array.isArray(pressure)) {
        return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
    }

    return (
        <View style={styles.loadingContainer}>
            <Text>Pressure: {pressure}</Text>
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
});

export default pressureDisplay;