import './Locations.css';

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
                <img src="../../src/img/delete-icon.svg" alt="delete-icon" />
            </button>
        </li>
    );
};

export const Locations = ({ favorites, setFavorites, setCurrentCity, getWeather }) => {
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
                    setCurrentCity(e.target.textContent);
                    getWeather();
                }
            }}>
                {favorites.map(createLocationItem)}
            </ul>
        </div>
    );
};
