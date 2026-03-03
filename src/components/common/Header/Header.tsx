import React, { FC } from 'react';
import { Logo } from '../Logo/Logo';
import './Header.css';

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <Logo />
      </div>
    </header>
  );
};
