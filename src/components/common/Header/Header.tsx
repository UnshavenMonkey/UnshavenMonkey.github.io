import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { authActions } from '../../../app/store/authSlice';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectProfile } from '../../../app/store/selectors';
import { Logo } from '../Logo/Logo';
import './Header.css';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

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
          {profile && (
            <NavLink className="header__link" to="/profile">
              Профиль
            </NavLink>
          )}
        </nav>
        <div className="header__auth">
          {profile ? (
            <>
              <span className="header__role">{profile.role === 'admin' ? 'Админ' : 'Пользователь'}</span>
              <button
                className="secondary-button header__button"
                type="button"
                onClick={() => dispatch(authActions.logoutRequested())}
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <button
                className="secondary-button header__button"
                type="button"
                onClick={() => dispatch(authActions.loginRequested('user'))}
              >
                Войти
              </button>
              <button
                className="primary-button header__button"
                type="button"
                onClick={() => dispatch(authActions.loginRequested('admin'))}
              >
                Войти как админ
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
