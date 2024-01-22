import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCity = async ({city}: { city: string }) => {
    try {
        const existingCities = await getCities() // get existing cities
        const updatedCities = existingCities ? [...existingCities, city] : [city] // add new city to existing cities
        await AsyncStorage.setItem('@saved_cities', JSON.stringify(updatedCities)) // save updated cities
        // console.log('City saved successfully');
    } catch (e) {
        console.error(e);
    }
};

export const getCities = async () => {
    try {
        const value = await AsyncStorage.getItem('@saved_cities') // get saved cities
        // console.log('Cities retrieved successfully');
        return value ? JSON.parse(value) : [] // return saved cities or empty array
    } catch(e) {
        console.error(e);
    }
};

export const deleteCity = async (city: string) => {
    try {
        const existingCities = await getCities(); // get existing cities
        const updatedCities = existingCities.filter(c => c !== city); // remove the city
        await AsyncStorage.setItem('@saved_cities', JSON.stringify(updatedCities)); // save updated cities
        // console.log('City deleted successfully');
    } catch (e) {
        console.error(e);
    }
};

export const clearCities = async () => {
    try {
        await AsyncStorage.removeItem('@saved_cities'); // remove saved cities
        // console.log('Cities cleared successfully');
    } catch (e) {
        console.error(e);
    }
}
