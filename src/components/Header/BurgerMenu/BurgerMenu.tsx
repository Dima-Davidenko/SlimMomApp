import React from 'react';
import clsx from 'clsx';

import { IconButton, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import css from './BurgerMenu.module.css';
import { useSelector } from 'react-redux';
import { appNavMenuArr } from '../../../assets/appNavMenu/appNavMenu';
import AppNavLink from '../AppNavLink/AppNavLink';
import { useTranslation } from 'react-i18next';
import { selectIsLoggedIn } from '../../../redux/auth/authSelectors';

const BurgerMenu: React.FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className={clsx(css.container, {
        [css.LoggedIn]: isLoggedIn,
      })}
    >
      <IconButton
        size="large"
        color="inherit"
        aria-label="menu"
        id="burger-menu"
        sx={{ display: { mobile: 'flex', laptop: 'none' } }}
        onClick={handleClick}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'burger-menu',
        }}
      >
        <MenuItem sx={{ justifyContent: 'center', textTransform: 'uppercase' }}>Menu</MenuItem>
        {appNavMenuArr.map(link => (
          <MenuItem key={link.title} onClick={handleClose}>
            <AppNavLink key={link.title} text={t(link.title)} path={link.path} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default BurgerMenu;
