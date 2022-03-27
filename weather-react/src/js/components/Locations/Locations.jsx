import './Locations.css';
import { useEffect } from 'react';
import { storage } from '../../storage';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentCity, changeFavorites, deleteFavorite, getWeatherAction } from '../../store/actions';

const LocationItem = ({ city }) => {
    const dispatch = useDispatch();

    const deleteFromFavorites = (city) => {
        dispatch(deleteFavorite(city));
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
    const { favorites } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeFavorites(storage.getFavorites()));
    }, []);

    useEffect(() => {
        if (favorites.length > 0) {
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
                    dispatch(getWeatherAction(city));
                }
            }}>
                {favorites?.map(createLocationItem)}
            </ul>
        </div>
    );
};
