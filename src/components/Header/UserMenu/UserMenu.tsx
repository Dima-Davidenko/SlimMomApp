import React from 'react';
import clsx from 'clsx';

import css from './UserMenu.module.css';

interface IProps {
  header: boolean;
  underBar: boolean;
}

const UserMenu: React.FC<IProps> = ({ header, underBar }) => {
  const isLoggedIn = false;
  const userName = 'Dima';
  return (
    <div
      className={clsx(css.container, {
        [css.LoggedIn]: isLoggedIn,
        [css.header]: header,
        [css.underBar]: underBar,
      })}
    >
      <span className={clsx(css.title, css.userName)}>{userName}</span>
      <button className={clsx(css.title, css.logOutBtn)}>Exit</button>
    </div>
  );
};

export default UserMenu;
