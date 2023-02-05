import { CircularProgress, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery } from '../../redux/diet/dietApi';
import AddProductForm from './AddProductForm/AddProductForm';
import Calendar from './Calendar/Calendar';
import css from './Diary.module.css';
import { DiaryProductsList } from './DiaryProductsList/DiaryProductsList';
import PlusCircleBtn from './OpenModalBtn/OpenModalBtn';

const body = document.querySelector('body');

const Diary = () => {
  const navigate = useNavigate();
  const {
    data: userInfo,
    isSuccess: userSuccess,
    isFetching: userFetching,
  } = useGetUserInfoQuery(null);
  const userAge = userInfo?.userData?.age;

  useEffect(() => {
    if (!userAge && userSuccess) navigate('/calculator');
  }, [navigate, userAge, userSuccess]);

  const [mobileAddProductForm, setMobileAddProductForm] = useState(false);
  const isMobile = useMediaQuery('(max-width:767px)');
  const toggleModalAddProductForm = () => {
    setMobileAddProductForm(!mobileAddProductForm);
    window.scrollTo({ top: 0 });
    body?.classList.toggle('modalOpen');
  };
  return (
    <div className={css.container}>
      <Calendar />
      {mobileAddProductForm && (
        <div className={css.mobAddProductForm}>
          <AddProductForm closeAddProductForm={toggleModalAddProductForm} />
        </div>
      )}
      {!isMobile && <AddProductForm />}
      <DiaryProductsList />
      {isMobile && !mobileAddProductForm && (
        <div className={css.btnOpenModalWrp}>
          <PlusCircleBtn clickAction={toggleModalAddProductForm} />
        </div>
      )}

      {userFetching && (
        <div
          style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <CircularProgress size={100} />
        </div>
      )}
    </div>
  );
};

export default Diary;
