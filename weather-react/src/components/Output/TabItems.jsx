import {useState} from "react";
import {Now} from "./Now";
import {Details} from "./Details";
import {Forecast} from "./Forecast";

export const TabItems = ({activeTab, weatherData, forecastData}) => {
  return (
      <div className="output-tabs__list">
        <Now label="Now" activeTab={activeTab} weatherData={weatherData} />
        <Details label="Details" activeTab={activeTab} weatherData={weatherData} />
        <Forecast label="Forecast" activeTab={activeTab} forecastData={forecastData}/>
      </div>
  )
}