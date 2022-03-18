import React, {useState} from 'react';
import './Output.css';
import {Tabs} from "./Tabs";
import {Now} from "./Now";
import {Details} from "./Details";
import {Forecast} from "./Forecast";


export const Output = ({weatherData, forecastData, favorites, setFavorites}) => {
  const labels = ['Now', 'Details', 'Forecast'];
  const [activeTab, setActiveTab] = useState('Now');
  
  return (
    <div className="weather__output output">
      <div className="output-tabs__list">
        <Now label="Now" activeTab={activeTab} weatherData={weatherData} setFavorites={setFavorites} favorites={favorites}/>
        <Details label="Details" activeTab={activeTab} weatherData={weatherData} />
        <Forecast label="Forecast" activeTab={activeTab} forecastData={forecastData}/>
      </div>
      <Tabs labels={labels} activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
  )
}