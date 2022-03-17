import './Locations.css';

const LocationItem = ({name}) => {
  return (
      <li className="locations-list__item location-item favourite" data-liked={name}>
        <span className="location-item__name">{name}</span>
        <button className="location-item__delete" type="button">
          <img src="../../src/img/delete-icon.svg" alt="delete-icon" />
        </button>
      </li>
  )
}

export const Locations = ({locations}) => {
  return (
      <div className="weather__locations locations">
        <div className="locations__title">Added Locations:</div>
        <ul className="locations__list locations-list">
          {locations.map(item => {
            <LocationItem name={item}/>
          })}
        </ul>
      </div>
  )
}