import {useState} from 'react'
import {useEffect} from 'react';
import './App.css'
import {Search} from "./components/Search/Search";
import {Content} from "./components/Content/Content";
import {apiKey, createData, getCurrentCity, serverUrl} from "./utils";

export const DEFAULT_CITY_NAME = 'Aktobe';
export const currentCity = getCurrentCity();


function App() {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});
  
  const getWeather = async (e) => {
    e.preventDefault();
    try {
      const url = `${serverUrl}?q=${getCurrentCity()}&appid=${apiKey}&units=metric`;
      const answer = await fetch(url);
      if (answer.ok) {
        const response = await answer.json();
        setWeatherData(createData(response));
      } else {
        throw new Error('Can not find this city');
      }
    } catch (e) {
      console.log(e);
    }
  }
  const getForecast = async (e) => {
    e.preventDefault();
    try {
      const forecast = await fetch(JSON.parse(localStorage.getItem('current')).forecastUrl);
      if (forecast.ok) {
        const response = await forecast.json();
        setForecastData(response);
      } else {
        throw new Error('Can not get forecast for this city');
      }
    } catch(e) {
      console.log(e);
    }
  }
  
  return (
      <div className="App site-container container">
        
        <form action="" className="weather" onSubmit={(e) => {
          getWeather(e);
          getForecast(e);
        }}>
          <Search/>
          <Content weatherData={weatherData} forecastData={forecastData}/>
        </form>
      </div>
  )
}

export default App
