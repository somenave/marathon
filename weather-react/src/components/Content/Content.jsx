
import "./Content.css";

import {Locations} from "../Locations/Locations";
import {Output} from "../Output/Output";
import {Search} from "../Search/Search";

export const Content = ({weatherData, forecastData}) => {
  return (
      <div className="weather__content">
        <Output weatherData={weatherData}  forecastData={forecastData}/>
        <Locations locations={JSON.parse(localStorage.getItem('favoriteCities'))}/>
      </div>
  )
}