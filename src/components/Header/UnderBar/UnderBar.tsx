import React from 'react';
import clsx from 'clsx';

import css from './UnderBar.module.css';

import UserMenu from '../UserMenu/UserMenu';

const UnderBar: React.FC = () => {
  const isLoggedIn = false;
  return (
    <div
      className={clsx(css.container, {
        [css.LoggedIn]: isLoggedIn,
      })}
    >
      <UserMenu header={false} underBar={true} />
    </div>
  );
};

export default UnderBar;
