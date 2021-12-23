import {
    UI
} from "./view.js";
import {
    tabsHandler
} from "./tab.js";

UI.TABS.forEach(tab => {
    tab.addEventListener('click', tabsHandler);
});

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let cityId = 524901;
let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&units=metric`;
let currentCity = localStorage.getItem('currentCity') || 'Aktobe';

let nowTemperature, nowTemperatureFeels, weatherDescr, iconId, sunrise, sunset;

const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities')) || [];

window.addEventListener('DOMContentLoaded', () => {
    getWeather();
    renderFavourites();
    isFavourite();
});

UI.WEATHER_INNER.addEventListener('submit', (e) => {
    e.preventDefault();
    currentCity = UI.SEARCH_INPUT.value;
    getWeather();
    isFavourite();
});

function getWeather() {
    const url = `${serverUrl}?q=${currentCity}&appid=${apiKey}&units=metric`;
    localStorage.setItem('currentCity', currentCity);
    fetch(url)
        .then(json => json.json())
        .then(response => {
            if (response.cod !== 200) {
                throw new Error('There is no such city');
            }
            nowTemperature = `${response.main.temp}`;
            nowTemperatureFeels = `${response.main.feels_like}`;
            weatherDescr = `${response.weather[0].main}`;
            iconId = `${response.weather[0].icon}`;
            sunrise = convertTime(response.sys.sunrise);
            sunset = convertTime(response.sys.sunset);
            setValues();
            getIcon(iconId);
            cityId = `${response.id}`;
            forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&units=metric`;
        })

        .then(() => {
            fetch(forecastUrl)
                .then(json => json.json())
                .then(response => {
                    UI.FORECAST_CONTAINER.innerHTML = '';
                    response.list.forEach((li) => {
                        nowTemperature = Math.round(li.main.temp);
                        nowTemperatureFeels = Math.round(li.main.feels_like);
                        weatherDescr = `${li.weather[0].main}`;
                        iconId = `${li.weather[0].icon}`;
                        const date = new Date(li.dt_txt);
                        const card = document.createElement('div');
                        card.innerHTML = `
                        <div class="forecast__card card">
                            <div class="card__top">
                                <div class="card__date">${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}</div>
                                <div class="card__time">${date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</div>
                            </div>
                            <div class="card__bottom">
                                <div class="card__temperature">
                                    <div class="card__real">Temperature: <span>${nowTemperature}</span>°</div>
                                    <div class="card__feels">Feels like: <span>${nowTemperatureFeels}</span>°</div>
                                </div>
                                <div class="card__weather">${weatherDescr}<img src="${getIcon(iconId)}" alt="rain"
                                        class="card__img"></div>
                            </div>
                        </div>
                        `;
                        UI.FORECAST_CONTAINER.append(card);
                    });
                });
        })
        .catch(alert);
}


function convertTime(unixTime) {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.slice(-2);
}

function getIcon(id) {
    let iconUrl = `https://openweathermap.org/img/wn/${id}@4x.png`;
    return iconUrl;
}

function setValues() {
    UI.NOW_TEMPERATURE.textContent = Math.round(nowTemperature);
    UI.LOCATION.forEach(location => {
        location.textContent = currentCity;
    });
    UI.DETAILS_TEMPERATURE.textContent = Math.round(nowTemperature);
    UI.DETAILS_TEMPERATURE_FEELS.textContent = Math.round(nowTemperatureFeels);
    UI.DETAILS_TEMPERATURE_DESCR.textContent = weatherDescr;
    UI.DETAILS_TEMPERATURE_SUNRISE.textContent = sunrise;
    UI.DETAILS_TEMPERATURE_SUNSET.textContent = sunset;
    UI.NOW_WEATHER_IMG.src = getIcon(iconId);
}

function isFavourite() {
    if (favoriteCities.includes(currentCity)) {
        UI.LIKE_BUTTON.classList.add('active');
    } else {
        UI.LIKE_BUTTON.classList.remove('active');
    }
}

function favouriteHandler() {
    if (!favoriteCities.includes(currentCity)) {
        addToFavorites(currentCity);
        renderFavourites();
        isFavourite();
    }
}

UI.LIKE_BUTTON.addEventListener('click', favouriteHandler);

function renderFavourites() {
    UI.FAVOURITE_LOCATIONS.innerHTML = '';
    favoriteCities.forEach(city => {
        let location = document.createElement('li');
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
    isFavourite();
}

UI.FAVOURITE_LOCATIONS.addEventListener('click', locationsClickHandler);

function addToFavorites(item) {
    favoriteCities.push(item);
    saveFavoriteCities(favoriteCities);
}

function deleteFromStorage(city) {
    favoriteCities.forEach((item, i) => {
        if (item == city) {
            favoriteCities.splice(i, 1);
        }
        saveFavoriteCities(favoriteCities);
    });
}

function saveFavoriteCities(favoriteCities) {
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
}