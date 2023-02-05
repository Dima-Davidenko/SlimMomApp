import clsx from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import css from './Logo.module.css';

import logoBody from '../../../assets/images/logo.png';
import logoBodyLight from '../../../assets/images/logoLight.png';
import logoSlimMom from '../../../assets/images/slimMom.svg';
import logoSlimMomLight from '../../../assets/images/slimMomLight.svg';
import { useSelector } from 'react-redux';
import { selectCurrentTheme } from '../../../redux/theme/themeSelectors';
import { ThemeNames } from '../../../types/themeNames';
import { selectIsLoggedIn } from '../../../redux/auth/authSelectors';

const Logo: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentTheme = useSelector(selectCurrentTheme);
  return (
    <div
      onClick={() => navigate('/')}
      className={clsx(css.container, { [css.LoggedIn]: isLoggedIn })}
    >
      <img
        className={css.woman}
        src={currentTheme === ThemeNames.darkTheme ? logoBodyLight : logoBody}
        alt="logo"
      />
      <img
        className={clsx(css.slimMom, {
          [css.LoggedIn]: isLoggedIn,
        })}
        src={currentTheme === ThemeNames.darkTheme ? logoSlimMomLight : logoSlimMom}
        alt="logo"
      />
    </div>
  );
};

export default Logo;
