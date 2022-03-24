
import { useEffect} from 'react';
import {storage} from "../../storage";
import {useDispatch, useSelector} from "react-redux";
import {addFavorite, changeFavorites} from "../../store/actions";

export const Now = ({ label, activeTab}) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const weather = state.weather;
    const currentCity = state.currentCity;
    const favorites = state.favorites;
  
    return (
        <div className={`output__now now output-item ${label === activeTab ? 'active' : ''}`}>
            <div className="now__temperature">
                <span className="now__temperature-value">{weather?.temperature}</span>
          &deg;
            </div>
            <div className="now__image">
                <img src={weather?.icon} alt="" className="now-weather-img" />
            </div>
            <div className="now__bottom now-bottom">
                <div className="now-bottom__location location">{currentCity}</div>
                <button className={`now-bottom__like ${favorites.includes(currentCity) ? 'active' : ''}`} type="button"
                    onClick={() => {
                      dispatch(addFavorite(currentCity));
                      storage.saveFavorites([...favorites, currentCity])
                    }}
                >
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.54" fillRule="evenodd" clipRule="evenodd"
                            d="M17.5 1C15.0556 1 12.8556 2.7875 12 5.125C11.1444 2.7875 8.94444 1 6.5 1C3.44444 1 1 3.6125 1 7.1875C1 12 5.27778 16.125 12 23C18.7222 16.125 23 12 23 7.1875C23 3.6125 20.5556 1 17.5 1Z"
                            stroke="black" strokeWidth="2"/>
                    </svg>

                </button>
            </div>
        </div>
    );
};
