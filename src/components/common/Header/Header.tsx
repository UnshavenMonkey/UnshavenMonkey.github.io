import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import './Header.css';

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <Logo />
        <nav className="header__nav" aria-label="Основная навигация">
          <NavLink className="header__link" to="/products">
            Товары
          </NavLink>
          <NavLink className="header__link" to="/cart">
            Корзина
          </NavLink>
          <NavLink className="header__link" to="/profile">
            Профиль
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
