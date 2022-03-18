import {getIcon} from "../../utils";

export const Card = ({data}) => {
  const _data = {
    date: new Date(data.dt_txt),
    temp: Math.round(data.main.temp),
    feels: Math.round(data.main.feels_like),
    icon: getIcon(data.weather[0].icon),
    descr: data.weather[0].main,
    day: `${new Date(data.dt_txt).getDate()}`,
    month: `${new Date(data.dt_txt).toLocaleString('en-US', { month: 'short' })}`,
    time: `${new Date(data.dt_txt).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}`
  }
  
    return (
        <li className="forecast__card card">
          <div className="card__top">
            <div className="card__date">
              {`${_data.day} ${_data.month}`}
            </div>
            <div className="card__time">
              {_data.time}
            </div>
          </div>
          <div className="card__bottom">
            <div className="card__temperature">
              <div className="card__real">Temperature: <span>{_data.temp}</span>°</div>
              <div className="card__feels">Feels like: <span>{_data.feels}</span>°</div>
            </div>
            <div className="card__weather">{_data.descr}
              <img src={_data.icon} alt={_data.descr} className="card__img" />
            </div>
          </div>
        </li>
    )
}


