import React, { FC } from 'react';
import { Logo } from '../Logo/Logo';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import './Header.css';

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <Logo />
        <div className="header__controls">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
