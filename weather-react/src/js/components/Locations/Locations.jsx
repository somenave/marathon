import './Locations.css';
import { useEffect, useContext } from 'react';
import { CityContext } from '../App';

const LocationItem = ({ city, favorites, setFavorites }) => {
    const deleteFromFavorites = (city) => {
        const _favorites = favorites.filter(item => item !== city);
        setFavorites(_favorites);
        localStorage.setItem('favorites', _favorites);
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

export const Locations = ({ setCurrentCity, setData, favorites, setFavorites }) => {
    const currentCity = useContext(CityContext);

    useEffect(() => {
        const storageFavorites = localStorage.getItem('favorites');
        setFavorites(JSON.parse(storageFavorites));
    }, []);

    useEffect(() => {
        if (favorites) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites]);

    const createLocationItem = (city, i) => {
        return (
            <LocationItem city={city} key={i} setFavorites={setFavorites} favorites={favorites}/>
        );
    };
    return (
        <div className="weather__locations locations">
            <div className="locations__title">Added Locations:</div>
            <ul className="locations__list locations-list" onClick={e => {
                if (e.target.tagName === 'SPAN') {
                    const city = e.target.textContent;
                    setCurrentCity(city);
                    setData(city);
                }
            }}>
                {favorites?.map(createLocationItem)}
            </ul>
        </div>
    );
};
