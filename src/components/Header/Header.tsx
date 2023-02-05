import React from 'react';

import css from './Header.module.css';

import AppNav from './AppNav/AppNav';
import AuthNav from './AuthNav/AuthNav';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import Logo from './Logo/Logo';
import UnderBar from './UnderBar/UnderBar';
import UserMenu from './UserMenu/UserMenu';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
import { useSelector } from 'react-redux';
import SetupMenu from './SetupMenu/SetupMenu';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import { useMediaQuery } from '@mui/material';

const Header: React.FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  return (
    <>
      <div className={css.container}>
        <Logo />
        {isLoggedIn && isDesktop && <AppNav />}
        {!isLoggedIn && <AuthNav />}
        {isDesktop && <ThemeSwitcher />}
        {isDesktop && <LanguageSwitcher />}
        {isLoggedIn && !isMobile && (
          <div className={css.userMenuWrp}>
            <UserMenu />
          </div>
        )}
        {!isDesktop && <SetupMenu />}
        {isLoggedIn && <BurgerMenu />}
      </div>
      {isLoggedIn && isMobile && <UnderBar />}
    </>
  );
};

export default Header;
