import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAccessToken } from '../../../redux/auth/authSelectors';
import { selectproductList } from '../../../redux/currentDayProducts/currentDayProductsSelectors';
import { updateCurrentDayProductList } from '../../../redux/currentDayProducts/currentDayProductsSlice';
import { selectCurrentDate } from '../../../redux/date/dateSelector';
import { useGetDayInfoQuery, useGetUserInfoQuery } from '../../../redux/diet/dietApi';
import { useAppDispatch } from '../../../redux/store/store';
import css from './DiaryProductsList.module.css';
import { DiaryProductsListItem } from './DiaryProductsListItem/DiaryProductsListItem';
import { ProductListSceleton } from './ProductListSceleton/ProductListSceleton';

export const DiaryProductsList = () => {
  const { t } = useTranslation('translation');
  const productList = useSelector(selectproductList);
  const dispatch = useAppDispatch();

  const currentDate = useSelector(selectCurrentDate);
  const accessToken = useSelector(selectAccessToken);
  const {
    data: userInfo,
    isSuccess: userSuccess,
    isFetching: userFetching,
  } = useGetUserInfoQuery(null);
  const userAge = userInfo?.userData?.age;
  const { data, isFetching, isSuccess } = useGetDayInfoQuery(currentDate, {
    skip: !currentDate || !accessToken || !userAge,
  });

  useEffect(() => {
    if (data) {
      dispatch(updateCurrentDayProductList(data.eatenProducts ?? []));
    }
  }, [data, dispatch]);

  return (
    <div className={css.container}>
      {(isFetching || userFetching) && productList.length === 0 && <ProductListSceleton />}
      {!userAge && userSuccess && (
        <div>
          {t('calc.noUserData') ?? 'Enter your details to complete the calendar:'}{' '}
          <Link to="/calculator">{t('navigate.calc') ?? 'Calculator'}</Link>
        </div>
      )}
      {!isFetching && isSuccess && productList.length === 0 && <div>No products</div>}
      <ul className={css.list}>
        {productList.length > 0 &&
          productList.map(product => {
            return <DiaryProductsListItem key={product.id} product={product} />;
          })}
      </ul>
    </div>
  );
};
