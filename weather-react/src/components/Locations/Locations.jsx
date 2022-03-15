import './Locations.css';

export const Locations = () => {
  return (
      <div className="weather__locations locations">
        <div className="locations__title">Added Locations:</div>
        <ul className="locations__list locations-list">
          <li className="locations-list__item location-item favourite" data-liked="Aktobe">
            <span className="location-item__name">Aktobe</span>
            <button className="location-item__delete" type="button">
              <img src="../../src/img/delete-icon.svg" alt="delete-icon" />
            </button>
          </li>
        </ul>
      </div>
  )
}