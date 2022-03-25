import React, { useState } from 'react';
import './Output.css';
import { Tabs } from './Tabs';
import { Now } from './Now';
import { Details } from './Details';
import { Forecast } from './Forecast';
import {Locations} from "../Locations/Locations";

export const Output = ({ weather }) => {
    const labels = ['Now', 'Details', 'Forecast'];
    const [activeTab, setActiveTab] = useState('Now');

    return (
        <div className="weather__output output">
            <div className="output-tabs__list">
                <Now label="Now" activeTab={activeTab} weather={weather}/>
                <Details label="Details" activeTab={activeTab} weather={weather}/>
                <Forecast label="Forecast" activeTab={activeTab} forecast={weather?.forecast}/>
            </div>
            <Tabs labels={labels} activeTab={activeTab} setActiveTab={setActiveTab}/>
        </div>
    );
};
