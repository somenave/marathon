import { UI } from "./view.js";
import { tabsHandler } from "./tab.js";

UI.TABS.forEach(tab => {
    tab.addEventListener('click', tabsHandler);
});

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
let cityName = '';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

let nowTemperature;
let nowTemperatureFeels;
let weatherDescr;
let iconId;

UI.WEATHER_INNER.addEventListener('submit', (e) => {
    e.preventDefault();
    cityName = UI.SEARCH_INPUT.value;
    getWeather();
    isFavourite(false);
});

function getIcon(id) {
    let iconUrl = `https://openweathermap.org/img/wn/${id}@4x.png`;
    UI.NOW_WEATHER_IMG.src = iconUrl;
}

function setValues() {
    UI.NOW_TEMPERATURE.textContent = nowTemperature;
    UI.LOCATION.forEach(location => {
        location.textContent = cityName;
    });
    UI.DETAILS_TEMPERATURE.textContent = nowTemperature;
    UI.DETAILS_TEMPERATURE_FEELS.textContent = nowTemperatureFeels;
    UI.DETAILS_TEMPERATURE_DESCR.textContent = weatherDescr;
}

function getWeather() {
    url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
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
            setValues();
            getIcon(iconId);
        })
        .catch(e => alert(e));
}

function favouriteHandler() {
    let favouriteArray = UI.FAVOURITE_LOCATIONS.children;
    let isNotAdded = true;
    for (let li of favouriteArray) {
        if (li.getAttribute('data-liked') == cityName) {
            isNotAdded = false;
            isFavourite(false);
            li.remove();
        }
    }
    if (isNotAdded && cityName !== '') {
        isFavourite(true);
        addToFavourites();
    }
}

function addToFavourites() {
    let location = document.createElement('li');
    location.classList.add('locations-list__item');
    location.setAttribute('data-liked', cityName);
    location.textContent = cityName;
    UI.FAVOURITE_LOCATIONS.append(location);
}

function isFavourite(operator) {
    if (operator) {
        UI.LIKE_BUTTON.classList.add('active');
    } else {
        UI.LIKE_BUTTON.classList.remove('active');
    }
}


UI.LIKE_BUTTON.addEventListener('click', () => {
    favouriteHandler();
});


UI.FAVOURITE_LOCATIONS.addEventListener('click', (e) => {
    if (e.target.classList.contains('locations-list__item')) {
        UI.WEATHER_INNER.reset();
        cityName = e.target.textContent;
        getWeather();
        isFavourite(true);
    }
});

// async function getWeather(url) {
//     let response = await fetch(url);
//     if (response.ok) {
//         let json = await response.json();
//         nowTemperature = `${json.main.temp}`;
//         nowTemperatureFeels = `${json.main.feels_like}`;
//         weatherDescr = `${json.weather[0].main}`;
//         setValues();
//     } else {
//         alert("Ошибка HTTP: " + response.status);
//     }
// }