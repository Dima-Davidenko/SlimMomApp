import React from 'react';
import { useTranslation } from 'react-i18next';
import { IDailyRateRes } from '../../../types/dietApiTypes';
import NotRecommndedFood from '../../DaySummary/NotRecommndedFood/NotRecommndedFood';
import css from './RateForModal.module.css';

interface IProps {
  data: IDailyRateRes;
}

const RateForModal: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'calc' });
  const { dailyRate, notAllowedProducts } = data;
  return (
    <div className={css.container}>
      <p className={css.title}>{t('modal.title')}</p>
      <div className={css.rate}>
        {(+dailyRate).toFixed(0)}
        <span className={css.kcal}>{t('modal.kcal')}</span>
      </div>
      <div className={css.notRecWrp}>
        <NotRecommndedFood foodList={notAllowedProducts} />
      </div>
    </div>
  );
};

export default RateForModal;
