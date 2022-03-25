import { Card } from './Card';
import { useContext } from 'react';
import {storage} from "../../storage";
import {useSelector} from "react-redux";


export const Forecast = ({ label, activeTab}) => {
  const {weather} = useSelector(state => state);
  // const {weather} = state.weather;
  const city = weather?.city;
  const forecast = weather?.forecast ?? [];
  
    const createForecastItem = (item, i) => {
        return (
            <Card key={i} data={item}/>
        );
    };

    return (
        <div className={`output__forecast forecast output-item ${label === activeTab ? 'active' : ''}`}>
            <div className="forecast__location location">{city}</div>
            <ul className="forecast__cards">
                {
                    forecast.map(createForecastItem)
                }
            </ul>
        </div>
    );
};
