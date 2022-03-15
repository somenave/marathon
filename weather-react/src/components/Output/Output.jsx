import {useState} from 'react';
import './Output.css';
import {Tabs} from "./Tabs";
import {TabItems} from "./TabItems";


export const Output = () => {
  const labels = ['Now', 'Details', 'Forecast'];
  const [activeTab, setActiveTab] = useState('Now');
  
  return (
    <div className="weather__output output">
      <TabItems activeTab={activeTab}/>
      <Tabs labels={labels} activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
  )
}