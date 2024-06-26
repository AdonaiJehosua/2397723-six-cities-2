import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-ts';
import { changeActiveCity } from '../../store/app-data/app-action';
import { Link } from 'react-router-dom';

type Props = {
  cityName: string;
}

export default function CitiesTabsItem({ cityName }: Props): React.JSX.Element {
  const activeCity = useAppSelector((state) => state.APP.activeCity);
  const dispatch = useAppDispatch();

  const changeActiveCityHandler = () => {
    dispatch(changeActiveCity(cityName));
  };

  return (
    <li className="locations__item">
      <Link
        className={`locations__item-link tabs__item ${cityName === activeCity?.name ? 'tabs__item--active' : ''}`}
        to='..'
        onClick={changeActiveCityHandler}
      >
        <span>{cityName}</span>
      </Link>
    </li>
  );
}
