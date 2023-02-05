import React, { useCallback, useEffect } from 'react';
import css from './Modal.module.css';
import CloseBtn from '../../assets/images/closeModalBtn.svg';

interface IProps {
  closeModalHandler: Function;
}

const Modal: React.FC<React.PropsWithChildren<IProps>> = ({ children, closeModalHandler }) => {
  const memoEscKeyHanler = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        closeModalHandler();
      }
    },
    [closeModalHandler]
  );
  useEffect(() => {
    window.addEventListener('keydown', memoEscKeyHanler);
    return () => {
      window.removeEventListener('keydown', memoEscKeyHanler);
    };
  }, [memoEscKeyHanler]);

  const onClickOvrlHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains(css.overlay)) {
      closeModalHandler();
    }
  };

  return (
    <div onClick={onClickOvrlHandler} className={css.overlay}>
      <div className={css.contentBox}>
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

export default Modal;
