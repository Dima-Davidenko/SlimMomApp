import React from 'react';
import clsx from 'clsx';

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import css from './BurgerMenu.module.css';

const BurgerMenu: React.FC = () => {
  const isLoggedIn = false;
  const menuOpen = false;
  return (
    <div
      className={clsx(css.container, {
        [css.LoggedIn]: isLoggedIn,
      })}
    >
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="menu"
        sx={{ display: { mobile: 'flex', laptop: 'none' } }}
        // onClick={toggleModal}
      >
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
    </div>
  );
};

export default BurgerMenu;
