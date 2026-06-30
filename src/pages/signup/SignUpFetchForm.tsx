import React, { FormEvent, useState } from 'react';
import { COMMAND_ID, parseSignUpErrors, signUpRequest, SignUpFormErrors } from '../../shared/api/signup';

const initialErrors: SignUpFormErrors = {
  general: [],
};

export const SignUpFetchForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState<SignUpFormErrors>(initialErrors);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setToken('');
    setErrors(initialErrors);

    try {
      const result = await signUpRequest({
        email,
        password,
        commandId: COMMAND_ID,
      });

      setToken(result.token);
    } catch (error) {
      setErrors(parseSignUpErrors(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Functional component + fetch</h2>
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

      <button className="primary-button" disabled={loading} type="submit">
        {loading ? 'Отправка...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};
