import React from 'react';

import css from './Header.module.css';

import AppNav from './AppNav/AppNav';
import AuthNav from './AuthNav/AuthNav';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import Logo from './Logo/Logo';
import UnderBar from './UnderBar/UnderBar';
import UserMenu from './UserMenu/UserMenu';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';

const Header: React.FC = () => {
  const isLoggedIn = false;
  return (
    <>
      <div className={css.container}>
        <Logo />
        {isLoggedIn && <AppNav />}
        <AuthNav />
        <ThemeSwitcher />
        {isLoggedIn && <UserMenu header={true} underBar={false} />}
        {isLoggedIn && <BurgerMenu />}
      </div>
      <UnderBar />
    </>
  );
};

export default Header;
