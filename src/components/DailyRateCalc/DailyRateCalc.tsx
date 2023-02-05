import { useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDailyRateMutation } from '../../redux/diet/dietApi';
import { ICalculatorFormData } from '../../types/dietApiTypes';
import CalculatorForm from '../CalculatorForm/CalculatorForm';
import Modal from '../Modal/Modal';
import ModalMobile from '../Modal/ModalMobile/ModalMobile';
import RateForModal from './RateForModal/RateForModal';

const body = document.querySelector('body');

const DailyRateCalc: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const isMobile = useMediaQuery('(max-width:767px)');
  const [postDailyRate, { data }] = useDailyRateMutation({
    fixedCacheKey: 'dailyRate',
  });
  const closeModal = () => {
    setModalOpen(false);
    window.scrollTo({ top: 0 });
    body?.classList.remove('modalOpen');
  };
  const handleFormSubmint = (formValues: ICalculatorFormData) => {
    setRequest(true);
    postDailyRate(formValues);
  };
  useEffect(() => {
    if (data && request) {
      setRequest(false);
      setModalOpen(true);
      window.scrollTo({ top: 0 });
      body?.classList.add('modalOpen');
    }
  }, [data, request]);

  return (
    <>
      <CalculatorForm onFormSubmit={handleFormSubmint} />
      {modalOpen && data && isMobile && (
        <ModalMobile closeModalHandler={closeModal}>
          <RateForModal data={data} />
        </ModalMobile>
      )}
      {modalOpen && data && !isMobile && (
        <Modal closeModalHandler={closeModal}>
          <RateForModal data={data} />
        </Modal>
      )}
    </>
  );
};

export default DailyRateCalc;
