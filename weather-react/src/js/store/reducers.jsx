import {combineReducers} from "redux";
import {ADD_FAVORITE_CITY, CURRENT_CITY, DELETE_FAVORITE_CITY, WEATHER} from "./actions";
import {DEFAULT_CITY_NAME} from "../utils";


const initialState = {
  currentCity: DEFAULT_CITY_NAME,
  favorites: [],
  weather: {}
}

const city = (state = initialState.currentCity, action) => {
  switch (action.type) {
    case CURRENT_CITY:
      return action.city;
    default:
      return state
  }
}

const favorites = (state = initialState.favorites, action) => {
  switch (action.type) {
    case ADD_FAVORITE_CITY:
      const favorites = new Set([...state, action.city])
      return [...favorites]
    case DELETE_FAVORITE_CITY:
      return state.filter(city => city !== action.city)
    
    default:
      return state
  }
}

const weather = (state = initialState.weather, action) => {
  switch (action.type) {
    case WEATHER:
      return {...state, ...{weather: action.weather}}
    default:
      return state
  }
}

export const weatherApp = combineReducers({city, favorites, weather});