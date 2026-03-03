import React, { createContext, FC, ReactNode, useContext, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

interface LanguageContextValue {
  language: string;
  changeLanguage: (lang: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const LanguageContext = createContext<LanguageContextValue>({ language: 'ru', changeLanguage: () => {} });

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('ru');

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LanguageContext.Provider>
  );
};
