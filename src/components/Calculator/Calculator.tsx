import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserId } from '../../redux/auth/authSelectors';
import { useGetUserInfoQuery, useUserDailyRateMutation } from '../../redux/diet/dietApi';
import { ICalculatorFormData } from '../../types/dietApiTypes';
import CalculatorForm from '../CalculatorForm/CalculatorForm';
import css from './Calculator.module.css';

const Calculator: React.FC = () => {
  const { t } = useTranslation('translation');
  const { data: userInfo, isSuccess: userSuccess } = useGetUserInfoQuery(null);
  const userAge = userInfo?.userData?.age;
  const [postUserDailyRate] = useUserDailyRateMutation({
    fixedCacheKey: 'daily-rate',
  });
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();
  const handleFormSubmint = (body: ICalculatorFormData) => {
    postUserDailyRate({ id: userId, body });
    navigate('/diary');
  };

  return (
    <>
      {!userAge && userSuccess && (
        <div className={css.warnNoUserData}>
          {t('calc.noUserData') ??
            'Enter your details in this form to be able to use all functions of our app'}{' '}
        </div>
      )}
      <CalculatorForm onFormSubmit={handleFormSubmint} />
    </>
  );
};

export default Calculator;
