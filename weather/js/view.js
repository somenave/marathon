// export const UI = {
//     WEATHER_INNER: document.querySelector('.weather'),
//     TABS: document.querySelectorAll('.output-tabs__item'),
//     TABS_CONTENT: document.querySelectorAll('.output-item'),
//     SEARCH_ICON: document.querySelector('.search__icon'),
//     SEARCH_INPUT: document.querySelector('.search__input'),
//     LIKE_BUTTON: document.querySelector('.now-bottom__like'),
//     NOW_TEMPERATURE: document.querySelector('.now__temperature'),
//     NOW_LOCATION: document.querySelector('.now-bottom__location'),
// };

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