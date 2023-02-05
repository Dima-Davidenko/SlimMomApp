import React from 'react';
import { Outlet } from 'react-router-dom';

import css from './SharedLayout.module.css';

import Header from '../Header/Header';

const SharedLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className={css.MainViewcontainer}>
        <Outlet />
      </div>
    </>
  );
};

export default SharedLayout;
