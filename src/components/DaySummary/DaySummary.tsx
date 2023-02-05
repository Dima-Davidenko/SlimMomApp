import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../redux/auth/authSelectors';
import { selectCurrentDate } from '../../redux/date/dateSelector';
import { useGetDayInfoQuery, useGetUserInfoQuery } from '../../redux/diet/dietApi';
import css from './DaySummary.module.css';
import NotRecommndedFood from './NotRecommndedFood/NotRecommndedFood';

const DaySummary = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'summary' });
  const currentDate = useSelector(selectCurrentDate);
  const formattedDay = currentDate ? format(parseISO(currentDate), 'dd/MM/Y') : '';
  const accessToken = useSelector(selectAccessToken);
  const { data: userInfo } = useGetUserInfoQuery(null);
  const userAge = userInfo?.userData?.age;
  const { data: dayInfo } = useGetDayInfoQuery(currentDate, {
    skip: !currentDate || !accessToken || !userAge,
  });
  const notRecommended = userInfo?.userData?.notAllowedProducts ?? [];
  const daySummary = dayInfo?.daySummary;
  const dailyRate = daySummary?.dailyRate ?? 0;
  const kcalConsumed = daySummary?.kcalConsumed ?? 0;
  const kcalDiff = Math.round(dailyRate - kcalConsumed);
  const percentsOfDailyRate = (kcalConsumed / dailyRate) * 100;
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={clsx(css.block, css.summary)}>
          <p className={css.title}>
            {t('title') ?? 'Summary for'} {formattedDay}
          </p>
          <div className={css.list}>
            <p className={css.item}>
              {t('daily') ?? 'Daily Rate'}{' '}
              <span>
                {dailyRate.toFixed(0)} {t('kcal') ?? 'kcal'}
              </span>
            </p>
            <p className={css.item}>
              {t('consumed') ?? 'Consumed'}{' '}
              <span>
                {kcalConsumed.toFixed(0)} {t('kcal') ?? 'kcal'}
              </span>
            </p>
            {kcalDiff < 0 ? (
              <p className={clsx(css.item, css.warn)}>
                {t('overWeight') ?? 'Stop eating, already overeat'}{' '}
                <span>
                  {kcalDiff * -1} {t('kcal') ?? 'kcal'}
                </span>
              </p>
            ) : (
              <p className={clsx(css.item, css.ok)}>
                {t('left') ?? 'Left'}{' '}
                <span>
                  {kcalDiff.toFixed(0)} {t('kcal') ?? 'kcal'}
                </span>
              </p>
            )}

            <p className={css.item}>
              {t('n') ?? 'n% of normal'}{' '}
              <span>{percentsOfDailyRate ? percentsOfDailyRate.toFixed(0) : '0'}%</span>
            </p>
          </div>
        </div>
        <div className={css.block}>
          <NotRecommndedFood foodList={notRecommended} />
        </div>
      </div>
    </div>
  );
};

export default DaySummary;
