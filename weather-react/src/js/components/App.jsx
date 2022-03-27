import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import { DEFAULT_CITY_NAME } from '../utils';
import { Search } from './Search/Search';
import { Output } from './Output/Output';
import { Locations } from './Locations/Locations';
import { getWeatherAction } from '../store/actions';
import { storage } from '../storage';

function App() {
    const { city } = useSelector(state => state);
    const currentCity = city ?? DEFAULT_CITY_NAME;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWeatherAction(currentCity));
    }, []);

    useEffect(() => {
        storage.saveCurrentCity(currentCity);
    }, [currentCity]);

    return (
        <div className="App weather container">
            <Search />
            <div className="weather__content">
                <Output />
                <Locations />
            </div>
        </div>
    );
}

export default App;
