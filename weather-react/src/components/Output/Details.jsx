import {currentCity} from "../../App";
import {getCurrentCity} from "../../utils";

export const Details = ({label, activeTab, weatherData}) => {
  return (
      <div className={`output__details details output-item  ${label === activeTab ? "active" : ''}`}>
        <div className="details__location location">{getCurrentCity()}</div>
        <div className="details__item details-item">
          Temperature:
          <span className="details-item__value details-item__temperature"> {weatherData.temperature}</span>
          <div className="deg">&deg;</div>
        </div>
        <div className="details__item details-item">
          Feels like:
          <span className="details-item__value details-item__feels"> {weatherData.temperatureFeels}</span>
          <div className="deg">&deg;</div>
        </div>
        <div className="details__item details-item">
          Weather:
          <span className="details-item__value details-item__descr"> {weatherData.weatherDescr}</span>
        </div>
        <div className="details__item details-item">
          Sunrise:
          <span className="details-item__value details-item__sunrise"> {weatherData.sunrise}</span>
        </div>
        <div className="details__item details-item">
          Sunset:
          <span className="details-item__value details-item__sunset"> {weatherData.sunset}</span>
        </div>
      </div>
  )
}