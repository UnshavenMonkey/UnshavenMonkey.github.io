import React, { FC, ReactNode } from 'react';
import { Header } from '../Header/Header';
import './Layout.css';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__content">{children}</main>
    </div>
  );
};
