import React, { useState, useEffect } from 'react';
import '../../App.css';
import { API, createData, DEFAULT_CITY_NAME } from '../utils';
import { Search } from './Search/Search';
import { Output } from './Output/Output';
import { Locations } from './Locations/Locations';

export const CityContext = React.createContext();

function App() {
    const [weatherData, setWeatherData] = useState({});
    const [forecastData, setForecastData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [currentCity, setCurrentCity] = useState(DEFAULT_CITY_NAME);

    useEffect(() => {
        const storageFavorites = localStorage.getItem('favorites');
        setFavorites(JSON.parse(storageFavorites));
    }, []);

    useEffect(() => {
        if (favorites) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites]);

    useEffect(() => {
        setCurrentCity(JSON.parse(localStorage.getItem('currentCity')));
    }, []);

    useEffect(() => {
        localStorage.setItem('currentCity', JSON.stringify(currentCity));
    }, [currentCity]);

    useEffect(() => {
        getWeather();
    }, []);

    const getWeather = async() => {
        try {
            const weatherUrl = `${API.WEATHER}?q=${currentCity}&appid=${API.KEY}&units=metric`;
            let forecastUrl = '';
            fetch(weatherUrl)
                .then(response => response.json())
                .then(data => {
                    setWeatherData(createData(data));
                    const cityId = data.id;
                    forecastUrl = `${API.FORECAST}?id=${cityId}&appid=${API.KEY}&units=metric`;
                })
                .then(() => {
                    fetch(forecastUrl)
                        .then(response => response.json())
                        .then(data => {
                            const list = data.list;
                            setForecastData(list);
                        });
                })
                .catch(console.log);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="App site-container container">
            <CityContext.Provider value={currentCity}>
                <form action="" className="weather" onSubmit={(e) => {
                    getWeather();
                    e.preventDefault();
                }}>
                    <Search setCurrentCity={setCurrentCity}/>
                    <div className="weather__content">
                        <Output weatherData={weatherData} forecastData={forecastData} favorites={favorites}
                            setFavorites={setFavorites}/>
                        <Locations favorites={favorites} setFavorites={setFavorites} setCurrentCity={setCurrentCity}
                            getWeather={getWeather}/>
                    </div>
                </form>
            </CityContext.Provider>
        </div>
    );
}

export default App;