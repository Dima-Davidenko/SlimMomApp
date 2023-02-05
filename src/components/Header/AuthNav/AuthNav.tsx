import React from 'react';

import css from './AuthNav.module.css';

import { useTranslation } from 'react-i18next';
import AppNavLink from '../AppNavLink/AppNavLink';

const AuthNav: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth.title' });
  return (
    <div className={css.container}>
      <AppNavLink text={t('login')} path="/login" />
      <AppNavLink text={t('registration')} path="/registration" />
    </div>
  );
};

export default AuthNav;
