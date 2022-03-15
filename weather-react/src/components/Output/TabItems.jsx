import {useState} from "react";
import {Now} from "./Now";
import {Details} from "./Details";
import {Forecast} from "./Forecast";

export const TabItems = ({activeTab}) => {
  return (
      <div className="output-tabs__list">
        <Now label="Now" activeTab={activeTab}/>
        <Details label="Details" activeTab={activeTab}/>
        <Forecast label="Forecast" activeTab={activeTab}/>
      </div>
  )
}