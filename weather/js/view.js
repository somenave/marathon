export const UI = {
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
    NOW_WEATHER_IMG: document.querySelector('.now-weather-img')
};

// function showTab(tabName) {
//     UI.TABS_CONTENT.forEach(tabContent => {
//         tabContent.classList.contains(tabName) ? tabContent.classList.add('active') : tabContent.classList.remove('active');
//     });
// }

// function tabsHandler() {
//     UI.TABS.forEach(tab => {
//         tab.classList.remove('active');
//         this.classList.add('active');
//         const tabName = this.getAttribute('data-tab');
//         showTab(tabName);
//     });
// }

// UI.TABS.forEach(tab => {
//     tab.addEventListener('click', tabsHandler);
// });