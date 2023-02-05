import { Button, TextField, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { schemaAddProduct } from '../../../assets/validation/schemas';
import { addProductCurrentDayList } from '../../../redux/currentDayProducts/currentDayProductsSlice';
import { selectCurrentDate } from '../../../redux/date/dateSelector';
import { useAddEatenProductMutation } from '../../../redux/diet/dietApi';
import { useAppDispatch } from '../../../redux/store/store';
import BackBtn from '../../Modal/BackBtn/BackBtn';
import PlusCircleBtn from '../OpenModalBtn/OpenModalBtn';
import css from './AddProductForm.module.css';
import ProductSearchInput from './ProductSearchInput/ProductSearchInput';

const initialValues = {
  weight: '',
};
interface IProps {
  closeAddProductForm?: Function;
}
const AddProductForm: React.FC<IProps> = ({ closeAddProductForm }) => {
  const isMobile = useMediaQuery('(max-width:767px)');
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation('translation');
  const lang = useRef('');
  const currentDate = useSelector(selectCurrentDate);

  const [prodId, setProdId] = useState('');
  const [key, setKey] = useState(Math.random());

  const [productSearchError, setProductSearchError] = useState(false);

  const [addProduct, result] = useAddEatenProductMutation();
  useEffect(() => {
    if (!result.isUninitialized && !result.isError && !result.isLoading) {
      dispatch(addProductCurrentDayList(result?.data?.eatenProduct));
    }
  }, [
    dispatch,
    result?.data?.eatenProduct,
    result.isError,
    result.isLoading,
    result.isUninitialized,
  ]);
  useEffect(() => {
    if (closeAddProductForm && result.status === 'fulfilled') {
      closeAddProductForm();
    }
  }, [closeAddProductForm, result.status]);

  const formik = useFormik({
    initialValues,
    validationSchema: schemaAddProduct(t),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (!prodId) {
        setProductSearchError(true);
        return;
      }
      addProduct({ date: currentDate, productId: prodId, weight: Number(values.weight) });
      setProdId('');
      setProductSearchError(false);
      setKey(Math.random());
      setSubmitting(false);
      resetForm();
    },
    validateOnBlur: true,
  });

  useEffect(() => {
    if (!isMobile && closeAddProductForm) closeAddProductForm();
  }, [closeAddProductForm, isMobile]);
  // Dynamic translation of helper text with errors
  setTimeout(() => {
    if (i18n.language !== lang.current) {
      Object.keys(formik.errors).forEach(fieldName => {
        if (Object.keys(formik.touched).includes(fieldName)) {
          formik.setFieldTouched(fieldName);
        }
      });
      lang.current = i18n.language;
    }
  }, 0);
  return (
    <div className={css.container}>
      <form className={css.addForm} onSubmit={formik.handleSubmit}>
        <ProductSearchInput
          key={key}
          setProdId={setProdId}
          error={productSearchError || (Boolean(formik.errors.weight) && !prodId)}
          setProductSearchError={setProductSearchError}
        />
        <TextField
          fullWidth
          type="number"
          name="weight"
          id="weight"
          label={t('diary.grams') ?? 'Grams'}
          value={formik.values.weight}
          onChange={formik.handleChange}
          error={formik.touched.weight && Boolean(formik.errors.weight)}
          helperText={(formik.touched.weight && formik.errors.weight) || ' '}
          FormHelperTextProps={{
            sx: { width: '300px', position: 'absolute', left: 0, bottom: -22 },
          }}
          sx={{ width: { mobile: '285px', tablet: '106px' }, mb: { mobile: '60px', tablet: 0 } }}
        />
        {isMobile && (
          <Button type="submit" sx={{ mt: { xs: '50px', sm: 0 } }}>
            {t('diary.btn') ?? 'Add'}
          </Button>
        )}
        {!isMobile && <PlusCircleBtn type="submit" />}

        {isMobile && <BackBtn onClickFunc={closeAddProductForm} />}
      </form>
    </div>
  );
};

export default AddProductForm;
