import {getIcon} from "../../utils";

export const Card = ({data}) => {
  return (
      <li className="forecast__card card">
        <div className="card__top">
          <div className="card__date">{`${data?.date.getDate()}` `${data?.date.toLocaleString('en-US', { month: 'short' })}`}</div>
          <div className="card__time">{data?.date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <div className="card__bottom">
          <div className="card__temperature">
            <div className="card__real">Temperature: <span>${data?.temperature}</span>°</div>
            <div className="card__feels">Feels like: <span>${data?.temperatureFeels}</span>°</div>
          </div>
          <div className="card__weather">{data?.weatherDescr}<img src={getIcon(data?.icon)} alt={data?.weatherDescr} className="card__img" />
          </div>
        </div>
        <div>Forecast.</div>
      </li>
  )
}

