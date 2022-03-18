
import {Card } from "./Card";
import {useContext} from "react";
import {CityContext} from "../App";

export const Forecast = ({label, activeTab, forecastData = []}) => {
  
  const currentCity = useContext(CityContext);
  
  const createForecastItem = (item, i) => {
    return (
      <Card key={i} data={item}/>
    )
  }
  
  return (
      <div className={`output__forecast forecast output-item ${label === activeTab ? "active" : ''}`}>
        <div className="forecast__location location">{currentCity}</div>
        <ul className="forecast__cards">
          {
            forecastData.map(createForecastItem)
          }
        </ul>
      </div>
  )
}

