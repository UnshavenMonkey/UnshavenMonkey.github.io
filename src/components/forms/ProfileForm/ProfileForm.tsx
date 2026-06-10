import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import '../formStyles.css';

export interface ProfileFormValues {
  name: string;
  about: string;
}

interface ProfileFormProps {
  initialValues?: ProfileFormValues;
  onSubmit?: (values: ProfileFormValues) => void;
}

const emptyValues: ProfileFormValues = {
  name: '',
  about: '',
};

const getProfileErrors = (values: ProfileFormValues) => {
  const errors: Partial<Record<keyof ProfileFormValues, string>> = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Enter at least 2 characters.';
  }

  if (values.about.trim().length > 240) {
    errors.about = 'Keep the description under 240 characters.';
  }

  return errors;
};

export const ProfileForm: FC<ProfileFormProps> = ({ initialValues = emptyValues, onSubmit }) => {
  const [values, setValues] = useState<ProfileFormValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof ProfileFormValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setValues(initialValues);
    setTouched({});
    setSubmitted(false);
  }, [initialValues]);

  const errors = getProfileErrors(values);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target;
    setTouched((currentTouched) => ({ ...currentTouched, [name]: true }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (Object.keys(errors).length > 0) {
      return;
    }

    console.log('Profile form submitted:', values);
    onSubmit?.(values);
    setValues(emptyValues);
    setTouched({});
    setSubmitted(false);
  };

  const shouldShowError = (field: keyof ProfileFormValues) => submitted || touched[field];

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <h2 className="form-panel__title">Profile</h2>
      <div className="form-panel__grid">
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
            autoFocus
          />
          <span className="form-field__error">{shouldShowError('name') ? errors.name : ''}</span>
        </label>

        <label className="form-field">
          <span className="form-field__label">About</span>
          <textarea
            className={`form-field__control form-field__control--textarea ${
              shouldShowError('about') && errors.about ? 'form-field__control--invalid' : ''
            }`}
            name="about"
            value={values.about}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="A few words about the user"
          />
          <span className="form-field__error">{shouldShowError('about') ? errors.about : ''}</span>
        </label>

        <div className="form-panel__actions">
          <button className="form-panel__button" type="submit">
            Save profile
          </button>
        </div>
      </div>
    </form>
  );
};
