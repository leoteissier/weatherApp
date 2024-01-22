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

export const convertUnixTimeToDay = (unixTime: number) => {
    const date = new Date(unixTime * 1000);
    const day = date.getDay();
    switch (day) {
        case 0:
            return 'Dimanche';
        case 1:
            return 'Lundi';
        case 2:
            return 'Mardi';
        case 3:
            return 'Mercredi';
        case 4:
            return 'Jeudi';
        case 5:
            return 'Vendredi';
        case 6:
            return 'Samedi';
        default:
            return '';
    }
}

export const roundObjectValues = (obj) => {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'number') {
            obj[key] = Number(obj[key].toFixed(0));
        }
    });
    return obj;
};