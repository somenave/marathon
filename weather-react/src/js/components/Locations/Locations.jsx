import './Locations.css';
import {useEffect, useContext} from 'react';
import {storage} from "../../storage";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentCity, changeFavorites, deleteFavorite} from "../../store/actions";
import {DEFAULT_CITY_NAME} from "../../utils";

const LocationItem = ({city}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  
  const deleteFromFavorites = (city) => {
    dispatch(deleteFavorite(city));
    storage.saveFavorites(state.favorites);
  };
  
  return (
      <li className="locations-list__item location-item favourite" data-liked={city}>
        <span className="location-item__name">{city}</span>
        <button className="location-item__delete" type="button" onClick={() => deleteFromFavorites(city)}>
          <img src="../../src/img/delete-icon.svg" alt="delete-icon"/>
        </button>
      </li>
  );
};

export const Locations = ({}) => {
  const state = useSelector(state => state);
  const favorites = state.favorites;
  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(changeFavorites(storage.getFavorites()));
  }, []);
  
  useEffect(() => {
    if (favorites) {
      storage.saveFavorites(favorites);
    }
  }, [favorites]);
  
  const createLocationItem = (city, i) => {
    return (
        <LocationItem city={city} key={i}/>
    );
  };
  return (
      <div className="weather__locations locations">
        <div className="locations__title">Added Locations:</div>
        <ul className="locations__list locations-list" onClick={e => {
          if (e.target.tagName === 'SPAN') {
            const city = e.target.textContent;
            dispatch(changeCurrentCity(city));
          }
        }}>
          {[...favorites]?.map(createLocationItem)}
        </ul>
      </div>
  );
};
