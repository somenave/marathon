import {DEFAULT_CITY_NAME} from "./utils";

export const storage = {
  saveFavorites: function (favoriteCities) {
    if (!favoriteCities) {
      return
    }
    const favorites = JSON.stringify([...favoriteCities])
    localStorage.setItem("favorites", favorites)
  },
  getFavorites: function () {
    const favoriteCities = localStorage.getItem("favorites")
    if (!favoriteCities) {
      return []
    }
    return [...new Set(JSON.parse(favoriteCities))]
  },
  getCurrentCity: function () {
    return JSON.parse(localStorage.getItem('currentCity')) || DEFAULT_CITY_NAME;
  },
  saveCurrentCity: function (city) {
    localStorage.setItem('currentCity', JSON.stringify(city));
  }
}