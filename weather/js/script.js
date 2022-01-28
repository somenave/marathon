import { UI } from './view.js';
import { tabsHandler } from './tab.js';

import { setCookie, addToFavorites, deleteFromStorage, favoriteCities } from './storage.js';

UI.TABS.forEach(tab => {
    tab.addEventListener('click', tabsHandler);
});

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const DEFAULT_CITY_ID = 524901;
let cityId = DEFAULT_CITY_ID;
let forecastUrl = '';
const DEFAULT_CITY_NAME = 'Aktobe';
let currentCity = localStorage.getItem('currentCity') || DEFAULT_CITY_NAME;

let CURRENT_PARAMS = {
    temperature: '',
    temperatureFeels: '',
    iconId: '',
    sunrise: '',
    sunset: ''
};

window.addEventListener('DOMContentLoaded', () => {
    getWeather();
    renderFavourites();
    toggleFavouriteButton();
});

UI.WEATHER_INNER.addEventListener('submit', (e) => {
    e.preventDefault();
    currentCity = UI.SEARCH_INPUT.value;
    getWeather();
    toggleFavouriteButton();
});

async function getWeather() {
    try {
        const url = `${serverUrl}?q=${currentCity}&appid=${apiKey}&units=metric`;
        localStorage.setItem('currentCity', currentCity);
        setCookie('currentCity', currentCity, { secure: true, 'max-age': 3600 });

        const answer = await fetch(url);
        if (answer.ok) {
            const response = await answer.json();
            CURRENT_PARAMS = new ParamsValues(response);
            setValues();
            getIcon(CURRENT_PARAMS.iconId);
            cityId = `${response.id}`;
            forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&units=metric`;
        } else {
            throw new Error('Can not find this city');
        }

        const forecast = await fetch(forecastUrl);
        if (forecast.ok) {
            UI.FORECAST_CONTAINER.innerHTML = '';
            const response = await forecast.json();
            response.list.forEach((li) => {
                CURRENT_PARAMS = new ParamsValues(li);
                const date = new Date(li.dt_txt);
                const card = document.createElement('div');
                card.innerHTML = `
            <div class="forecast__card card">
                <div class="card__top">
                    <div class="card__date">${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}</div>
                    <div class="card__time">${date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
                <div class="card__bottom">
                    <div class="card__temperature">
                        <div class="card__real">Temperature: <span>${CURRENT_PARAMS.temperature}</span>°</div>
                        <div class="card__feels">Feels like: <span>${CURRENT_PARAMS.temperatureFeels}</span>°</div>
                    </div>
                    <div class="card__weather">${CURRENT_PARAMS.weatherDescr}<img src="${getIcon(CURRENT_PARAMS.iconId)}" alt="rain"
                            class="card__img"></div>
                </div>
            </div>
            `;
                UI.FORECAST_CONTAINER.append(card);
            });
        } else {
            throw new Error('Can not get forecast for this city');
        }
    } catch (e) {
        alert(e);
    }
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

// CONSTRUCTOR

function ParamsValues(response) {
    this.temperature = `${Math.round(response.main.temp)}`;
    this.temperatureFeels = `${Math.round(response.main.feels_like)}`;
    this.weatherDescr = `${response.weather[0].main}`;
    this.iconId = `${response.weather[0].icon}`;
    this.sunrise = convertTime(response.sys.sunrise);
    this.sunset = convertTime(response.sys.sunset);
}

function setValues() {
    UI.NOW_TEMPERATURE.textContent = Math.round(CURRENT_PARAMS.temperature);
    UI.LOCATION.forEach(location => {
        location.textContent = currentCity;
    });
    UI.DETAILS_TEMPERATURE.textContent = CURRENT_PARAMS.temperature;
    UI.DETAILS_TEMPERATURE_FEELS.textContent = CURRENT_PARAMS.temperatureFeels;
    UI.DETAILS_TEMPERATURE_DESCR.textContent = CURRENT_PARAMS.weatherDescr;
    UI.DETAILS_TEMPERATURE_SUNRISE.textContent = CURRENT_PARAMS.sunrise;
    UI.DETAILS_TEMPERATURE_SUNSET.textContent = CURRENT_PARAMS.sunset;
    UI.NOW_WEATHER_IMG.src = getIcon(CURRENT_PARAMS.iconId);
}

function toggleFavouriteButton() {
    if (favoriteCities.has(currentCity)) {
        UI.LIKE_BUTTON.classList.add('active');
    } else {
        UI.LIKE_BUTTON.classList.remove('active');
    }
}

function favouriteHandler() {
    if (!favoriteCities.has(currentCity)) {
        addToFavorites(currentCity);
        renderFavourites();
        toggleFavouriteButton();
    }
}

UI.LIKE_BUTTON.addEventListener('click', favouriteHandler);

function renderFavourites() {
    UI.FAVOURITE_LOCATIONS.innerHTML = '';
    favoriteCities.forEach(city => {
        const location = document.createElement('li');
        location.innerHTML = `
        <span class="location-item__name">${city}</span>
        <button class="location-item__delete" type="button"><img src="./img/delete-icon.svg" alt="Delete icon"></button>
        `;
        location.classList.add('locations-list__item', 'location-item', 'favourite');
        location.setAttribute('data-liked', city);
        UI.FAVOURITE_LOCATIONS.append(location);
    });
}

function locationsClickHandler(e) {
    const target = e.target;
    if (target.classList.contains('location-item__name')) {
        UI.WEATHER_INNER.reset();
        currentCity = target.parentElement.getAttribute('data-liked');
        getWeather();
    }
    if (target.classList.contains('location-item__delete')) {
        target.parentElement.remove();
        deleteFromStorage(target.parentElement.getAttribute('data-liked'));
    }
    toggleFavouriteButton();
}

UI.FAVOURITE_LOCATIONS.addEventListener('click', locationsClickHandler);
