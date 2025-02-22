import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" width={45} height={45} src="/img/logo.jpg" alt="logo" />
        <span className="header__name">Wealthy</span>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">
                Главная
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/Trecker" className="nav__link">
                Трекер финансов
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/mortgage" className="nav__link">
                Рассчитать ипотеку
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/converter" className="nav__link">
                Курс валют
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
