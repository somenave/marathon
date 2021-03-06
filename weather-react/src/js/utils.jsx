export const DEFAULT_CITY_NAME = 'Aktobe';

export const API = {
    KEY: '87453c8bc09d9673632c72bd4f544cba',
    WEATHER: 'https://api.openweathermap.org/data/2.5/weather',
    FORECAST: 'https://api.openweathermap.org/data/2.5/forecast'
};

export function createData(response) {
    return {
        city: response.name,
        temperature: `${Math.round(response.main.temp)}`,
        temperatureFeels: `${Math.round(response.main.feels_like)}`,
        weatherDescr: `${response.weather[0].main}`,
        icon: getIcon(response.weather[0].icon),
        sunrise: convertTime(response.sys.sunrise),
        sunset: convertTime(response.sys.sunset)

    };
}

export function getIcon(id) {
    return `https://openweathermap.org/img/wn/${id}@4x.png`;
}

function convertTime(unixTime) {
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    return hours + ':' + minutes.slice(-2);
}

export const getWeather = async(currentCity) => {
    try {
        const weatherUrl = `${API.WEATHER}?q=${currentCity}&appid=${API.KEY}&units=metric`;
        const forecastUrl = `${API.FORECAST}?q=${currentCity}&appid=${API.KEY}&units=metric`;
        const response = await fetch(weatherUrl).then(res => res.json());
        const data = createData(response);
        data.forecast = await fetch(forecastUrl).then(res => res.json()).then(json => json.list);
        return data;
    } catch (e) {
        console.log(e);
    }
};
