import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../app/store/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectAuthError, selectAuthLoading, selectIsAuthorized } from '../../app/store/selectors';
import './SignInPage.css';

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthorized) {
      navigate('/profile', { replace: true });
    }
  }, [isAuthorized, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authActions.loginRequested({ email, password }));
  };

  return (
    <section className="signin-page">
      <div className="page-heading">
        <h1>Вход</h1>
        <p>Авторизация через боевой REST API с сохранением токена и загрузкой профиля.</p>
      </div>

      <form className="signin-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Email</span>
          <input
            autoComplete="email"
            name="email"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            autoComplete="current-password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error && <p className="signin-form__error">{error}</p>}
        <button className="primary-button" disabled={loading} type="submit">
          {loading ? 'Входим...' : 'Войти'}
        </button>
      </form>
    </section>
  );
};
