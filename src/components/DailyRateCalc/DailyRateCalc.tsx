import React from 'react';
import CalculatorForm from '../CalculatorForm/CalculatorForm';
import { IUserData } from '../../types/userInfo';

const DailyRateCalc: React.FC = () => {
  const handleFormSubmint = (formValues: IUserData) => {};
  return (
    <>
      <CalculatorForm onFormSubmit={handleFormSubmint} userData={null} />
    </>
  );
};

export default DailyRateCalc;
