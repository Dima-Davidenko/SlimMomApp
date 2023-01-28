import React from 'react';
import clsx from 'clsx';

import css from './AuthNav.module.css';

import AppNavLink from '../AppNavLink/AppNavLink';

const AuthNav: React.FC = () => {
  const isLoggedIn = false;
  return (
    <div
      className={clsx(css.container, {
        [css.LoggedIn]: isLoggedIn,
      })}
    >
      <AppNavLink text="Log in" path="/login" />
      <AppNavLink text="Registration" path="/registration" />
    </div>
  );
};

export default AuthNav;
