// import { UI } from "./view";

const UI = {
    WEATHER_INNER: document.querySelector('.weather'),
    TABS: document.querySelectorAll('.output-tabs__item'),
    TABS_CONTENT: document.querySelectorAll('.output-item'),
    SEARCH_ICON: document.querySelector('.search__icon'),
    SEARCH_INPUT: document.querySelector('.search__input'),
    LIKE_BUTTON: document.querySelector('.now-bottom__like'),
    NOW_TEMPERATURE: document.querySelector('.now__temperature-value'),
    LOCATION: document.querySelectorAll('.location'),
    DETAILS_TEMPERATURE: document.querySelector('.details-item__temperature'),
    DETAILS_TEMPERATURE_FEELS: document.querySelector('.details-item__feels'),
    DETAILS_TEMPERATURE_DESCR: document.querySelector('.details-item__descr'),
};


function showTab(tabName) {
    UI.TABS_CONTENT.forEach(tabContent => {
        tabContent.classList.contains(tabName) ? tabContent.classList.add('active') : tabContent.classList.remove('active');
    });
}

function tabsHandler() {
    UI.TABS.forEach(tab => {
        tab.classList.remove('active');
        this.classList.add('active');
        const tabName = this.getAttribute('data-tab');
        showTab(tabName);
    });
}

UI.TABS.forEach(tab => {
    tab.addEventListener('click', tabsHandler);
});



const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
let cityName = 'boston';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

let nowTemperature;
let nowTemperatureFeels;
let weatherDescr;

UI.WEATHER_INNER.addEventListener('submit', (e) => {
    e.preventDefault();
    cityName = UI.SEARCH_INPUT.value;
    url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    getWeather(url);
});

function setValues() {
    UI.NOW_TEMPERATURE.textContent = nowTemperature;
    UI.LOCATION.forEach(location => {
        location.textContent = cityName;
    });
    UI.DETAILS_TEMPERATURE.textContent = nowTemperature;
    UI.DETAILS_TEMPERATURE_FEELS.textContent = nowTemperatureFeels;
    UI.DETAILS_TEMPERATURE_DESCR.textContent = weatherDescr;
}

async function getWeather(url) {
    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        nowTemperature = `${json.main.temp}`;
        nowTemperatureFeels = `${json.main.feels_like}`;
        weatherDescr = `${json.weather[0].main}`;
        setValues();
    } else {
        alert("Ошибка HTTP: " + response.status);
    }

}