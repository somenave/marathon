import './Search.css';
import React, {  useState } from 'react';

import { changeCurrentCity, getWeatherAction } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { DEFAULT_CITY_NAME } from '../../utils';

export const Search = ({}) => {
    const [city, setCity] = useState('');
    const dispatch = useDispatch();

    return (
        <form action="" className="weather__search search"
            onSubmit={ async(e) => {
                e.preventDefault();
                dispatch(changeCurrentCity(city));
                dispatch(getWeatherAction(city));
                e.target.reset();
            }}>
            <input type="text" className="search__input" placeholder={city || DEFAULT_CITY_NAME} onChange={(e) => setCity(e.target.value)}/>
            <button className="search__icon search-icon" type="submit">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                        d="M16.3775 14.5H15.385L15.04 14.1575C16.2588 12.7363 17 10.8938 17 8.87502C17 4.38752 13.3625 0.750021 8.875 0.750021C4.3875 0.750021 0.75 4.38752 0.75 8.87502C0.75 13.3625 4.3875 17 8.875 17C10.8938 17 12.735 16.26 14.1563 15.0425L14.5013 15.385V16.375L20.7488 22.6138L22.6125 20.75L16.3775 14.5ZM8.87501 14.5C5.76751 14.5 3.25001 11.9825 3.25001 8.87502C3.25001 5.76877 5.76751 3.25002 8.87501 3.25002C11.9813 3.25002 14.5 5.76877 14.5 8.87502C14.5 11.9825 11.9813 14.5 8.87501 14.5Z"
                        fill="black"/>
                </svg>
            </button>
        </form>
    );
};
