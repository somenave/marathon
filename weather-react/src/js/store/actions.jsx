import {DEFAULT_CITY_NAME} from "../utils";

export const CURRENT_CITY = 'CURRENT_CITY';
export const FAVORITES = 'FAVORITES';
export const WEATHER = 'WEATHER';
export const ADD_FAVORITE_CITY = 'ADD_FAVORITE_CITY';
export const DELETE_FAVORITE_CITY = 'DELETE_FAVORITE_CITY';

export const changeCurrentCity = (city) => {
  return {
    type: CURRENT_CITY,
    city: city
  }
}

export const changeFavorites = (favorites) => {
  return {
    type: FAVORITES,
    favorites
  }
}

export const addFavorite = (city) => {
  return {
    type: ADD_FAVORITE_CITY,
    city
  }
}

export const deleteFavorite = (city) => {
  return {
    type: DELETE_FAVORITE_CITY,
    city
  }
}

export const weatherHandler = (weather) => {
  return {
    type: WEATHER,
    weather
  }
}
