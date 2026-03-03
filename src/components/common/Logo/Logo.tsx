import React, { FC } from 'react';
import './Logo.css';

export const Logo: FC = () => {
  return (
    <div className="logo">
      <div className="logo__circle" />
      <span className="logo__text">MyApp</span>
    </div>
  );
};
