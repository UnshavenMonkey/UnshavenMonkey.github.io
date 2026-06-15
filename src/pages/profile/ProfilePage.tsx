import React, { ChangeEvent, Component, FormEvent } from 'react';
import './ProfilePage.css';

export interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ProfilePageProps {
  values: ProfileFormValues;
  onSubmit: (values: ProfileFormValues) => void;
}

interface ProfilePageState extends ProfileFormValues {
  saved: boolean;
}

export class ProfilePage extends Component<ProfilePageProps, ProfilePageState> {
  state: ProfilePageState = {
    ...this.props.values,
    saved: false,
  };

  componentDidUpdate(previousProps: ProfilePageProps) {
    if (previousProps.values !== this.props.values) {
      this.setState({ ...this.props.values, saved: false });
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, saved: false } as Pick<ProfilePageState, keyof ProfilePageState>);
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, phone, address } = this.state;
    this.props.onSubmit({ name, email, phone, address });
    this.setState({ saved: true });
  };

  render() {
    const { name, email, phone, address, saved } = this.state;

    return (
      <section className="profile-page">
        <div className="page-heading">
          <h1>Профиль</h1>
          <p>Контактные данные покупателя для заказов и уведомлений.</p>
        </div>

        <form className="profile-form" onSubmit={this.handleSubmit}>
          <label className="field">
            <span>Имя</span>
            <input name="name" value={name} onChange={this.handleChange} required />
          </label>
          <label className="field">
            <span>Email</span>
            <input name="email" type="email" value={email} onChange={this.handleChange} required />
          </label>
          <label className="field">
            <span>Телефон</span>
            <input name="phone" value={phone} onChange={this.handleChange} required />
          </label>
          <label className="field">
            <span>Адрес доставки</span>
            <textarea name="address" rows={4} value={address} onChange={this.handleChange} required />
          </label>
          <div className="profile-form__footer">
            <button className="primary-button" type="submit">
              Сохранить профиль
            </button>
            {saved && <span className="profile-form__status">Профиль сохранен</span>}
          </div>
        </form>
      </section>
    );
  }
}
