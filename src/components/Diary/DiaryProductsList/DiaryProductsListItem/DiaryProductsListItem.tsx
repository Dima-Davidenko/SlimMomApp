import clsx from 'clsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deleteProductCurrentDayList } from '../../../../redux/currentDayProducts/currentDayProductsSlice';
import { selectCurrentDate, selectCurrentDateId } from '../../../../redux/date/dateSelector';
import { useDeleteEatenProductMutation } from '../../../../redux/diet/dietApi';
import { useAppDispatch } from '../../../../redux/store/store';
import { IEatenProductInfo } from '../../../../types/dietApiTypes';
import css from './DiaryProductsListItem.module.css';

interface IProps {
  product: IEatenProductInfo;
}

export const DiaryProductsListItem: React.FC<IProps> = ({
  product: { title, kcal, weight, id },
}) => {
  const [deleteProduct, result] = useDeleteEatenProductMutation();
  const currentDateId = useSelector(selectCurrentDateId);
  const currentDate = useSelector(selectCurrentDate);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    deleteProduct({ dayId: currentDateId, eatenProductId: id, date: currentDate });
  };

  useEffect(() => {
    if (!result.isUninitialized && !result.isError && !result.isLoading) {
      dispatch(deleteProductCurrentDayList(id));
    }
  }, [deleteProduct, dispatch, id, result]);

  return (
    <li className={css.item}>
      <div className={clsx(css.cell, css.productName)}>
        <p>{title}</p>
      </div>

      <div className={clsx(css.cell, css.productWeight)}>
        <p>
          <span>{weight}</span>
          <span className={css.unit}>g</span>
        </p>
      </div>

      <div className={clsx(css.cell, css.productKcal)}>
        <p className={css.kcal}>
          <span>{kcal.toFixed(0)}</span>
          <span className={css.unit}>kcal</span>
        </p>
      </div>

      <div className={css.cell}>
        <button
          className={clsx(css.deleteIcon, {
            [css.deleting]: result.isLoading,
          })}
          disabled={result.isLoading}
          onClick={() => {
            handleDelete(id);
          }}
        />
      </div>
    </li>
  );
};
