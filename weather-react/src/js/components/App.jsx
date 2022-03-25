import React, {useState, useEffect} from 'react';
import {combineReducers, createStore} from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import {DEFAULT_CITY_NAME, getWeather} from '../utils';
import {Search} from './Search/Search';
import {Output} from './Output/Output';
import {Locations} from './Locations/Locations';
import {changeCurrentCity, changeFavorites, weatherHandler} from "../store/actions";
import {storage} from "../storage";

function App() {
  const [weather, setWeather] = useState({});
  const state = useSelector(state => state);
  const currentCity = state.currentCity ?? DEFAULT_CITY_NAME;
  const dispatch = useDispatch();
  
  useEffect(() => {
    storage.saveCurrentCity(currentCity);
    setWeather(getWeather(currentCity));
    dispatch(weatherHandler(weather));
  }, [currentCity])
  
  return (
        <div className="App weather container">
            <Search setWeahter={setWeather}/>
            <div className="weather__content">
              <Output weather={weather}/>
              <Locations />
            </div>
        </div>
  );
}

export default App;
