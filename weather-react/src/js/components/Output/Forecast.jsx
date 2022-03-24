import { Card } from './Card';
import { useContext } from 'react';
import {storage} from "../../storage";


export const Forecast = ({ label, activeTab, forecast = [] }) => {
    const currentCity = storage.getCurrentCity();

    const createForecastItem = (item, i) => {
        return (
            <Card key={i} data={item}/>
        );
    };

    return (
        <div className={`output__forecast forecast output-item ${label === activeTab ? 'active' : ''}`}>
            <div className="forecast__location location">{currentCity}</div>
            <ul className="forecast__cards">
                {
                    forecast.map(createForecastItem)
                }
            </ul>
        </div>
    );
};
