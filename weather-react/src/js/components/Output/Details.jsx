import { useSelector } from 'react-redux';

export const Details = ({ label, activeTab }) => {
    const { weather } = useSelector(state => state);
    return (
        <div className={`output__details details output-item  ${label === activeTab ? 'active' : ''}`}>
            <div className="details__location location">{weather?.city}</div>
            <div className="details__item details-item">
          Temperature:
                <span className="details-item__value details-item__temperature"> {weather?.temperature}</span>
                <div className="deg">&deg;</div>
            </div>
            <div className="details__item details-item">
          Feels like:
                <span className="details-item__value details-item__feels"> {weather?.temperatureFeels}</span>
                <div className="deg">&deg;</div>
            </div>
            <div className="details__item details-item">
          Weather:
                <span className="details-item__value details-item__descr"> {weather?.weatherDescr}</span>
            </div>
            <div className="details__item details-item">
          Sunrise:
                <span className="details-item__value details-item__sunrise"> {weather?.sunrise}</span>
            </div>
            <div className="details__item details-item">
          Sunset:
                <span className="details-item__value details-item__sunset"> {weather?.sunset}</span>
            </div>
        </div>
    );
};
