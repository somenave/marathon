import React, { useState, useEffect } from 'react';
import '../../App.css';
import { DEFAULT_CITY_NAME, getWeather } from '../utils';
import { Search } from './Search/Search';
import { Output } from './Output/Output';
import { Locations } from './Locations/Locations';

export const CityContext = React.createContext();

function App() {
    const [currentCity, setCurrentCity] = useState(DEFAULT_CITY_NAME);
    const [favorites, setFavorites] = useState([]);
    const [weather, setWeather] = useState({});

    const setData = async(currentCity) => {
        const weather = await getWeather(currentCity);
        setWeather(weather);
    };

    useEffect(() => {
        setCurrentCity(JSON.parse(localStorage.getItem('currentCity')));
    }, []);

    useEffect(() => {
        localStorage.setItem('currentCity', JSON.stringify(currentCity));
    }, [currentCity]);

    useEffect(() => {
        setData(currentCity);
    }, []);

    return (
        <div className="App site-container container">
            <CityContext.Provider value={currentCity}>
                <form action="" className="weather"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setData(currentCity);
                    }}>
                    <Search setCurrentCity={setCurrentCity}/>
                    <div className="weather__content">
                        <Output
                            favorites={favorites}
                            setFavorites={setFavorites}
                            weather={weather}
                            setData={setData}
                        />
                        <Locations
                            favorites={favorites}
                            setFavorites={setFavorites}
                            setCurrentCity={setCurrentCity}
                            setData={setData}/>
                    </div>
                </form>
            </CityContext.Provider>
        </div>
    );
}

export default App;
