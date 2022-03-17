import {currentCity} from "../../App";
import {createData, getCurrentCity, getIcon} from "../../utils";
import {Card} from "./Card";

export const Forecast = ({label, activeTab, forecastData = {}}) => {
  
  return (
      <div className={`output__forecast forecast output-item ${label === activeTab ? "active" : ''}`}>
        <div className="forecast__location location">{getCurrentCity()}</div>
        <ul className="forecast__cards">
          {
            forecastData?.list?.map((li, i) => {
              // console.log(<Card data={createData(li)} key={i}/>);
              <Card data={createData(li)} key={i}/>
            })
          }
        </ul>
      </div>
  )
}
