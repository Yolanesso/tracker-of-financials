import React from 'react';
import '../scss/header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img width={45} height={45} src="/img/logo.jpg" alt="logo" className="header__logo" />
        <span className="header__name"> Wealthy </span>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#" className="nav__link">
                Калькулятор финансов
              </a>
            </li>
            <li className="nav__item">
              <a href="#" className="nav__link">
                Расчитать ипотеку
              </a>
            </li>
            <li className="nav__item">
              <a href="#" className="nav__link">
                Курс валют
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
