import React from 'react';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

import css from './SharedLayout.module.css';

import Header from '../Header/Header';

const SharedLayout: React.FC = () => {
  const isLoggedIn = false;
  return (
    <>
      <Header />
      <div
        className={clsx(css.MainViewcontainer, {
          [css.LoggedIn]: isLoggedIn,
        })}
      >
        <Outlet />
      </div>
    </>
  );
};

export default SharedLayout;
