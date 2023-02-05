import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { logOut } from '../../../redux/auth/authOperations';
import { selectUser } from '../../../redux/auth/authSelectors';
import { updateCurrentDayProductList } from '../../../redux/currentDayProducts/currentDayProductsSlice';
import { updateCurrentDay } from '../../../redux/date/dateSlice';
import { useAppDispatch } from '../../../redux/store/store';
import css from './UserMenu.module.css';

const UserMenu: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const dispatch = useAppDispatch();
  const { username } = useSelector(selectUser);
  const handleExitClick = () => {
    dispatch(updateCurrentDay(''));
    dispatch(updateCurrentDayProductList([]));
    dispatch(logOut());
  };
  return (
    <div className={css.container}>
      <span className={clsx(css.title, css.userName)}>{username}</span>
      <button className={clsx(css.title, css.logOutBtn)} onClick={handleExitClick}>
        {t('title.exit') ?? 'Exit'}
      </button>
    </div>
  );
};

export default UserMenu;
