import {useState} from 'react';
import './Output.css';
import {Tabs} from "./Tabs";
import {TabItems} from "./TabItems";
import {Content} from "../Content/Content";


export const Output = ({weatherData, forecastData}) => {
  const labels = ['Now', 'Details', 'Forecast'];
  const [activeTab, setActiveTab] = useState('Now');
  
  return (
    <div className="weather__output output">
      <TabItems activeTab={activeTab} weatherData={weatherData}  forecastData={forecastData}/>
      <Tabs labels={labels} activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
  )
}