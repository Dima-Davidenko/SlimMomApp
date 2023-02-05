import React from 'react';
import CloseBtn from '../../../assets/images/closeModalBtn.svg';
import css from './ModalMobile.module.css';

interface IProps {
  closeModalHandler: Function;
}

const ModalMobile: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  closeModalHandler,
}) => {
  const onClickOvrlHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains(css.overlay)) {
      closeModalHandler();
    }
  };
  return (
    <div onClick={onClickOvrlHandler} className={css.overlay}>
      <div className={css.container}>
        {children}
        <img
          className={css.closeBtn}
          src={CloseBtn}
          onClick={() => closeModalHandler()}
          alt="close button"
        ></img>
      </div>
    </div>
  );
};

export default ModalMobile;
