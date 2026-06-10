import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import '../formStyles.css';

type AuthMode = 'login' | 'register';

export interface AuthFormValues {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

interface AuthFormProps {
  initialMode?: AuthMode;
  initialValues?: AuthFormValues;
  onSubmit?: (values: AuthFormValues, mode: AuthMode) => void;
}

const emptyValues: AuthFormValues = {
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getAuthErrors = (values: AuthFormValues, mode: AuthMode) => {
  const errors: Partial<Record<keyof AuthFormValues, string>> = {};

  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email.';
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(values.password)) {
    errors.password = 'Use at least 8 characters with a letter and a number.';
  }

  if (mode === 'register') {
    if (values.name.trim().length < 2) {
      errors.name = 'Enter at least 2 characters.';
    }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords must match.';
    }
  }

  return errors;
};

export const AuthForm: FC<AuthFormProps> = ({ initialMode = 'login', initialValues = emptyValues, onSubmit }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [values, setValues] = useState<AuthFormValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof AuthFormValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setValues(initialValues);
    setTouched({});
    setSubmitted(false);
  }, [initialMode, initialValues]);

  const errors = getAuthErrors(values, mode);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouched((currentTouched) => ({ ...currentTouched, [name]: true }));
  };

  const handleModeChange = (nextMode: AuthMode) => {
    setMode(nextMode);
    setTouched({});
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (Object.keys(errors).length > 0) {
      return;
    }

    console.log('Auth form submitted:', { mode, values });
    onSubmit?.(values, mode);
    setValues(emptyValues);
    setTouched({});
    setSubmitted(false);
  };

  const shouldShowError = (field: keyof AuthFormValues) => submitted || touched[field];

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <h2 className="form-panel__title">Authorization</h2>
      <div className="form-panel__switch" aria-label="Authorization mode">
        <button
          className={`form-panel__switch-button ${
            mode === 'login' ? 'form-panel__switch-button--active' : ''
          }`}
          type="button"
          onClick={() => handleModeChange('login')}
        >
          Login
        </button>
        <button
          className={`form-panel__switch-button ${
            mode === 'register' ? 'form-panel__switch-button--active' : ''
          }`}
          type="button"
          onClick={() => handleModeChange('register')}
        >
          Register
        </button>
      </div>

      <div className="form-panel__grid">
        {mode === 'register' && (
          <label className="form-field">
            <span className="form-field__label">Name</span>
            <input
              className={`form-field__control ${
                shouldShowError('name') && errors.name ? 'form-field__control--invalid' : ''
              }`}
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Jane Cooper"
            />
            <span className="form-field__error">{shouldShowError('name') ? errors.name : ''}</span>
          </label>
        )}

        <label className="form-field">
          <span className="form-field__label">Email</span>
          <input
            className={`form-field__control ${
              shouldShowError('email') && errors.email ? 'form-field__control--invalid' : ''
            }`}
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="jane@example.com"
            type="email"
          />
          <span className="form-field__error">{shouldShowError('email') ? errors.email : ''}</span>
        </label>

        <label className="form-field">
          <span className="form-field__label">Password</span>
          <input
            className={`form-field__control ${
              shouldShowError('password') && errors.password ? 'form-field__control--invalid' : ''
            }`}
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password123"
            type="password"
          />
          <span className="form-field__error">{shouldShowError('password') ? errors.password : ''}</span>
        </label>

        {mode === 'register' && (
          <label className="form-field">
            <span className="form-field__label">Confirm password</span>
            <input
              className={`form-field__control ${
                shouldShowError('confirmPassword') && errors.confirmPassword
                  ? 'form-field__control--invalid'
                  : ''
              }`}
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password123"
              type="password"
            />
            <span className="form-field__error">
              {shouldShowError('confirmPassword') ? errors.confirmPassword : ''}
            </span>
          </label>
        )}

        <div className="form-panel__actions">
          <button className="form-panel__button" type="submit">
            {mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </div>
      </div>
    </form>
  );
};
