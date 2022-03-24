import {DEFAULT_CITY_NAME} from "./utils";

export const storage = {
  saveFavorites: function (favoriteCities) {
    if (!favoriteCities) {
      return
    }
    const favorites = JSON.stringify([...favoriteCities])
    localStorage.setItem("favoriteCities", favorites)
  },
  getFavorites: function () {
    const favoriteCities = localStorage.getItem("favoriteCities")
    if (!favoriteCities) {
      return new Set([])
    }
    return new Set(JSON.parse(favoriteCities))
  },
  getCurrentCity: function () {
    const city = JSON.parse(localStorage.getItem('currentCity')) || DEFAULT_CITY_NAME;
    return city;
  },
  saveCurrentCity: function (city) {
    localStorage.setItem('currentCity', JSON.stringify(city));
  }
}