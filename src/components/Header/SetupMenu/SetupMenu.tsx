import { IconButton, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import css from './SetupMenu.module.css';

const SetupMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={css.container}>
      <IconButton
        size="large"
        color="inherit"
        aria-label="menu"
        id="setup-menu"
        sx={{ display: { mobile: 'flex', laptop: 'none' } }}
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'setup-menu',
        }}
        sx={{ display: { md: 'none' } }}
      >
        <MenuItem sx={{ justifyContent: 'center', textTransform: 'uppercase' }}>Settings</MenuItem>
        <MenuItem onClick={handleClose} sx={{ justifyContent: 'center' }}>
          <ThemeSwitcher />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LanguageSwitcher />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SetupMenu;
