import React from 'react';
import clsx from 'clsx';

import css from './AppNav.module.css';

import AppNavLink from '../AppNavLink/AppNavLink';

import { appNavMenuArr } from '../../../assets/appNavMenu/appNavMenu';

const AppNav: React.FC = () => {
  const isLoggedIn = false;
  return (
    <nav
      className={clsx(css.container, {
        [css.LoggedIn]: isLoggedIn,
      })}
    >
      {appNavMenuArr.map(link => (
        <AppNavLink text={link.title} path={link.path} />
      ))}
    </nav>
  );
};

export default AppNav;
