import React from 'react';
import { SignUpFetchForm } from './SignUpFetchForm';
import { SignUpRtkQueryForm } from './SignUpRtkQueryForm';
import './SignUpPage.css';

export const SignUpPage = () => {
  return (
    <section className="signup-page">
      <div className="page-heading">
        <h1>Регистрация</h1>
        <p>Два варианта отправки данных на боевой REST API: напрямую из компонента и через RTK Query.</p>
      </div>

      <div className="signup-page__forms">
        <SignUpFetchForm />
        <SignUpRtkQueryForm />
      </div>
    </section>
  );
};
