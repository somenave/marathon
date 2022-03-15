import {currentCity} from "./App";

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const DEFAULT_CITY_ID = 524901;
let cityId = DEFAULT_CITY_ID;

let CURRENT_PARAMS = {
  temperature: '',
  temperatureFeels: '',
  iconId: '',
  sunrise: '',
  sunset: ''
};

function ParamsValues(response) {
  this.temperature = `${Math.round(response.main.temp)}`;
  this.temperatureFeels = `${Math.round(response.main.feels_like)}`;
  this.weatherDescr = `${response.weather[0].main}`;
  this.iconId = `${response.weather[0].icon}`;
  this.sunrise = convertTime(response.sys.sunrise);
  this.sunset = convertTime(response.sys.sunset);
}

function convertTime(unixTime) {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  return hours + ':' + minutes.slice(-2);
}

function getIcon(id) {
  return `https://openweathermap.org/img/wn/${id}@4x.png`;
}

const Card = ({data}) => {
  return (
      <div className="forecast__card card">
        <div className="card__top">
          <div className="card__date">{`${data.date.getDate()}` `${data.date.toLocaleString('en-US', { month: 'short' })}`}</div>
          <div className="card__time">{data.date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <div className="card__bottom">
          <div className="card__temperature">
            <div className="card__real">Temperature: <span>${data.temperature}</span>°</div>
            <div className="card__feels">Feels like: <span>${data.temperatureFeels}</span>°</div>
          </div>
          <div className="card__weather">${data.weatherDescr}<img src={getIcon(data.iconId)} alt="rain" className="card__img" />
        </div>
      </div>
      </div>
  )
}

export async function getWeather() {
  try {
    const url = `${serverUrl}?q=${currentCity}&appid=${apiKey}&units=metric`;
    localStorage.setItem('currentCity', currentCity);
    
    const answer = await fetch(url);
    if (answer.ok) {
      const response = await answer.json();
      const data = {
        temperature: `${Math.round(response.main.temp)}`,
        temperatureFeels: `${Math.round(response.main.feels_like)}`,
        weatherDescr: `${response.weather[0].main}`,
        iconId: `${response.weather[0].icon}`,
        sunrise: convertTime(response.sys.sunrise),
        sunset: convertTime(response.sys.sunset),
        forecastUrl: `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&units=metric`,
        cityId: `${response.id}`
      }
      localStorage.setItem('current', JSON.stringify(data));
    } else {
      throw new Error('Can not find this city');
    }
    
  } catch (e) {
    alert(e);
  }
}

const forecast = await fetch(JSON.parse(localStorage.getItem('current')).forecastUrl);
if (forecast.ok) {
  const response = await forecast.json();
  response.list.forEach((li) => {
  
    const data = {
      temperature: `${Math.round(li.main.temp)}`,
      temperatureFeels: `${Math.round(li.main.feels_like)}`,
      weatherDescr: `${li.weather[0].main}`,
      iconId: `${li.weather[0].icon}`,
      sunrise: convertTime(li.sys.sunrise),
      sunset: convertTime(li.sys.sunset),
      forecastUrl: `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&units=metric`,
      cityId: `${li.id}`,
      date: new Date(li.dt_txt)
    }
    localStorage.setItem('forecast', JSON.stringify(data));
    // <Card date={date}/>
    // console.log('forecast');
  });
} else {
  throw new Error('Can not get forecast for this city');
}