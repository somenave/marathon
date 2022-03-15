import { useState } from 'react'
import {useEffect} from 'react';
import './App.css'
import {Search} from "./components/Search/Search";
import {Content} from "./components/Content/Content";
import {getWeather} from "./requests";

export const DEFAULT_CITY_NAME = 'Aktobe';
export let currentCity = localStorage.getItem('currentCity') ?? DEFAULT_CITY_NAME;

function App() {
  useEffect(() => {
    getWeather();
  })
  return (
    <div className="App site-container container">
      <form action="" className="weather">
        <Search />
        <Content />
      </form>
    </div>
  )
}

export default App
