import React from 'react'
import ReactDOM from 'react-dom'
import '../index.css'
import App from './components/App'
import {weatherApp} from "./store/reducers";
import {Provider} from "react-redux";
import {createStore} from "redux";

export const store = createStore(weatherApp);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
