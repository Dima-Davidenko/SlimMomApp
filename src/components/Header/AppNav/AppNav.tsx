import React from 'react';

import css from './AppNav.module.css';

import AppNavLink from '../AppNavLink/AppNavLink';

import { useTranslation } from 'react-i18next';
import { appNavMenuArr } from '../../../assets/appNavMenu/appNavMenu';

const AppNav: React.FC = () => {
  const { t } = useTranslation();
  return (
    <nav className={css.container}>
      {appNavMenuArr.map(link => (
        <AppNavLink key={link.title} text={t(link.title)} path={link.path} />
      ))}
    </nav>
  );
};

export default AppNav;
