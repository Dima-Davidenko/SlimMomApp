import React from 'react';

import css from './UnderBar.module.css';

import UserMenu from '../UserMenu/UserMenu';

const UnderBar: React.FC = () => {
  return (
    <div className={css.container}>
      <UserMenu />
    </div>
  );
};

export default UnderBar;
