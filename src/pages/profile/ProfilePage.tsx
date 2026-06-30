import React, { ChangeEvent, Component, FormEvent } from 'react';
import { authActions } from '../../app/store/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectProfile, selectProfileError, selectProfileSaving } from '../../app/store/selectors';
import { Profile } from '../../app/store/types';
import './ProfilePage.css';

export interface ProfileFormValues {
  name: string;
}

interface ProfileFormProps {
  values: Profile;
  saving: boolean;
  error: string | null;
  onSubmit: (values: ProfileFormValues) => void;
}

interface ProfilePageState extends ProfileFormValues {
  saved: boolean;
}

class ProfileForm extends Component<ProfileFormProps, ProfilePageState> {
  state: ProfilePageState = {
    name: this.props.values.name,
    saved: false,
  };

  componentDidUpdate(previousProps: ProfileFormProps) {
    if (previousProps.values !== this.props.values) {
      this.setState({ name: this.props.values.name, saved: true });
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value, saved: false });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSubmit({ name: this.state.name });
  };

  render() {
    const { name, saved } = this.state;
    const { values, saving, error } = this.props;

    return (
      <section className="profile-page">
        <div className="page-heading">
          <h1>Профиль</h1>
          <p>Данные загружаются с REST API. Сервер разрешает редактировать имя пользователя.</p>
        </div>

        <form className="profile-form" onSubmit={this.handleSubmit}>
          <label className="field">
            <span>Имя</span>
            <input name="name" value={name} onChange={this.handleChange} />
          </label>
          <label className="field">
            <span>Email</span>
            <input name="email" type="email" value={values.email} disabled />
          </label>
          {values.signUpDate && (
            <p className="profile-form__meta">Дата регистрации: {new Date(values.signUpDate).toLocaleDateString()}</p>
          )}
          {error && <p className="profile-form__error">{error}</p>}
          <div className="profile-form__footer">
            <button className="primary-button" disabled={saving} type="submit">
              {saving ? 'Сохраняем...' : 'Сохранить профиль'}
            </button>
            {saved && !error && <span className="profile-form__status">Профиль сохранен</span>}
          </div>
        </form>
      </section>
    );
  }
}

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const saving = useAppSelector(selectProfileSaving);
  const error = useAppSelector(selectProfileError);

  if (!profile) {
    return null;
  }

  return (
    <ProfileForm
      values={profile}
      saving={saving}
      error={error}
      onSubmit={(values) => dispatch(authActions.profileUpdateRequested(values))}
    />
  );
};
