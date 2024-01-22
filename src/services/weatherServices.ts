const API_KEY = process.env.EXPO_PUBLIC_API_KEY || ""
const lang = process.env.EXPO_PUBLIC_LANG || "en"

const fetchWeatherData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return await response.json();
};

export const fetchCurrentWeatherData = async (city: string) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`;
    return await fetchWeatherData(url);
}

export const fetchHourlyWeatherData = async (city: string) => {
    const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&cnt=24&units=metric&lang=${lang}&appid=${API_KEY}`;
    return await fetchWeatherData(url);
}

export const fetchDailyWeatherData = async (city: string) => {
    const url = `https://pro.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=10&units=metric&lang=${lang}&appid=${API_KEY}`;
    return await fetchWeatherData(url);
}