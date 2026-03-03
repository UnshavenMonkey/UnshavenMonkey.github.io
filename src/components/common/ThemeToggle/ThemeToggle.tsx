import React, { FC } from 'react';
import { useTheme } from '../../../providers/ThemeProvider/ThemeProvider';
import './ThemeToggle.css';

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
