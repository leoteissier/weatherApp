// Convertit Kelvin en Celsius
export const kelvinToCelsius = (kelvin: number) => {
    return kelvin - 273.15;
};

// Convertit Kelvin en Fahrenheit
export const kelvinToFahrenheit = (kelvin: number) => {
    return ((kelvin - 273.15) * 9) / 5 + 32;
};

// Convertit UnixTime en jour de la semaine
export const convertUnixTimeToHour = (unixTime: number) => {
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();
    return `${hours}H`;
};

const lang = process.env.EXPO_PUBLIC_LANG || "en"
// Converts UnixTime to day of the week, adapted for language
export const convertUnixTimeToDay = (unixTime: number) => {
    const date = new Date(unixTime * 1000);
    const day = date.getDay();
    const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daysFr = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    if (lang === "en") {
        return daysEn[day];
    } else if (lang === "fr") {
        return daysFr[day];
    } else {
        return '';
    }
}


export const roundObjectValues = (obj: any) => {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'number') {
            obj[key] = Number(obj[key].toFixed(0));
        }
    });
    return obj;
};