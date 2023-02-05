import React from 'react';
import css from './BackBtn.module.css';
import backBtn from '../../../assets/images/backArrowModal.png';

interface IProps {
  onClickFunc?: Function;
}

const BackBtn: React.FC<IProps> = ({ onClickFunc }) => {
  return (
    <button
      onClick={() => onClickFunc && onClickFunc()}
      style={{ backgroundImage: `url(${backBtn})` }}
      type="button"
      className={css.backBtn}
    >
      Back
    </button>
  );
};

export default BackBtn;
