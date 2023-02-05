import clsx from 'clsx';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import css from './NotRecommndedFood.module.css';

interface IProps {
  foodList: string[];
}

const NotRecommndedFood: React.FC<IProps> = ({ foodList }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'summary' });
  const [filter, setFilter] = useState('');
  return (
    <>
      <p className={clsx(css.title, css.notRec)}>{t('noFoodTitle') ?? 'Food not recommended'}</p>
      <input
        className={css.filterInput}
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value.toLowerCase().trim())}
        placeholder={t('filter') ?? 'Filter products'}
      />
      {foodList.length > 0 && (
        <div className={css.recom}>
          <ul className={css.list}>
            {foodList
              .filter(product => product.toLowerCase().includes(filter))
              .map(product => (
                <li className={css.item} key={product}>
                  {product}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default NotRecommndedFood;
