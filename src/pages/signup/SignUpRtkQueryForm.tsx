import React, { FormEvent, useState } from 'react';
import { useSignUpMutation } from '../../app/store/signupApi';
import { COMMAND_ID, parseSignUpErrors, SignUpFormErrors } from '../../shared/api/signup';

const initialErrors: SignUpFormErrors = {
  general: [],
};

const getErrorPayload = (error: unknown) => {
  if (error && typeof error === 'object' && 'data' in error) {
    return error.data;
  }

  return error;
};

export const SignUpRtkQueryForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState<SignUpFormErrors>(initialErrors);
  const [signUp, { isLoading }] = useSignUpMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setToken('');
    setErrors(initialErrors);

    try {
      const result = await signUp({
        email,
        password,
        commandId: COMMAND_ID,
      }).unwrap();

      setToken(result.token);
    } catch (error) {
      setErrors(parseSignUpErrors(getErrorPayload(error)));
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Redux Toolkit Query</h2>
      <label className="signup-form__field">
        <span>Email</span>
        <input
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          name="email"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.email && <span className="signup-form__error">{errors.email}</span>}
      </label>

      <label className="signup-form__field">
        <span>Password</span>
        <input
          aria-invalid={Boolean(errors.password)}
          autoComplete="new-password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.password && <span className="signup-form__error">{errors.password}</span>}
      </label>

      {errors.general.map((error) => (
        <p className="signup-form__error" key={error}>
          {error}
        </p>
      ))}

      {token && <p className="signup-form__success">Регистрация прошла успешно. Token: {token}</p>}

      <button className="primary-button" disabled={isLoading} type="submit">
        {isLoading ? 'Отправка...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};
