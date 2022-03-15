import {currentCity} from "../../App";

export const Details = ({label, activeTab}) => {
  return (
      <div className={`output__details details output-item  ${label === activeTab ? "active" : ''}`}>
        <div className="details__location location">{currentCity}</div>
        <div className="details__item details-item">
          Temperature:
          <span className="details-item__value details-item__temperature">14</span>
          <div className="deg">&deg;</div>
        </div>
        <div className="details__item details-item">
          Feels like:
          <span className="details-item__value details-item__feels">10</span>
          <div className="deg">&deg;</div>
        </div>
        <div className="details__item details-item">
          Weather:
          <span className="details-item__value details-item__descr">Clouds</span>
        </div>
        <div className="details__item details-item">
          Sunrise:
          <span className="details-item__value details-item__sunrise">03:21</span>
        </div>
        <div className="details__item details-item">
          Sunset:
          <span className="details-item__value details-item__sunset">18:54</span>
        </div>
      </div>
  )
}