import React, { FC } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider/LanguageProvider';
import './LanguageSwitcher.css';

export const LanguageSwitcher: FC = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        className={`language-switcher__btn ${language === 'ru' ? 'language-switcher__btn--active' : ''}`}
        type="button"
        onClick={() => changeLanguage('ru')}
      >
        RU
      </button>
      <button
        className={`language-switcher__btn ${language === 'en' ? 'language-switcher__btn--active' : ''}`}
        type="button"
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
};
