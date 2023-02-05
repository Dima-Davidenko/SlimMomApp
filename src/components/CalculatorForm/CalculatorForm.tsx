import { useFormik } from 'formik';
import React, { useRef } from 'react';

import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import css from './CalculatorForm.module.css';
import { formControlStyles, formHeperTextStyles, inputStyles } from './CalculatorForm.styles';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { schemaCalculator } from '../../assets/validation/schemas';
import { selectAccessToken } from '../../redux/auth/authSelectors';
import { useGetUserInfoQuery } from '../../redux/diet/dietApi';
import { ICalculatorFormData } from '../../types/dietApiTypes';

interface IProps {
  onFormSubmit: (body: ICalculatorFormData) => void;
}
const CalculatorForm: React.FC<IProps> = ({ onFormSubmit }) => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'calc' });
  const accessToken = useSelector(selectAccessToken);
  const lang = useRef('');
  const { data: userInfo } = useGetUserInfoQuery(null, { skip: !accessToken });
  const userData = userInfo?.userData;
  let initialValues: ICalculatorFormData = {
    age: '',
    height: '',
    weight: '',
    desiredWeight: '',
    bloodType: 0,
  };
  if (userData) {
    const { age, height, weight, desiredWeight, bloodType } = userData;
    initialValues = {
      age: age || '',
      height: height || '',
      weight: weight || '',
      desiredWeight: desiredWeight || '',
      bloodType,
    };
  }
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: schemaCalculator(t),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const age = +values.age;
      const height = +values.height;
      const weight = +values.weight;
      const desiredWeight = +values.desiredWeight;
      const bloodType = +values.bloodType;
      onFormSubmit({ age, height, weight, desiredWeight, bloodType });
      setSubmitting(false);
      resetForm();
    },
    validateOnBlur: true,
  });

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
      <h2 className={css.formTitle}>{t('title')}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={css.inputsWrapper}>
          <div>
            <TextField
              id="form__input-height"
              name="height"
              label={t('form.title.height')}
              value={formik.values.height}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.height && Boolean(formik.errors.height)}
              helperText={(formik.touched.height && formik.errors.height) || ' '}
              sx={inputStyles}
            />
            <TextField
              id="form__input-age"
              name="age"
              label={t('form.title.age')}
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={(formik.touched.age && formik.errors.age) || ' '}
              sx={inputStyles}
            />
            <TextField
              id="form__input-current-weight"
              name="weight"
              label={t('form.title.curWeight')}
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={(formik.touched.weight && formik.errors.weight) || ' '}
              sx={inputStyles}
            />
          </div>
          <div>
            <TextField
              id="form__input-desired-weight"
              name="desiredWeight"
              label={t('form.title.desWeight')}
              value={formik.values.desiredWeight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.desiredWeight && Boolean(formik.errors.desiredWeight)}
              helperText={(formik.touched.desiredWeight && formik.errors.desiredWeight) || ' '}
              sx={inputStyles}
            />
            <FormControl
              sx={formControlStyles}
              error={formik.touched.bloodType && Boolean(formik.errors.bloodType)}
            >
              <FormLabel id="bloodType-label">{t('form.title.bloodType')}</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-bloodType-label"
                defaultValue="female"
                name="bloodType"
                value={formik.values.bloodType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={<Typography variant="caption">1</Typography>}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={<Typography variant="caption">2</Typography>}
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label={<Typography variant="caption">3</Typography>}
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label={<Typography variant="caption">4</Typography>}
                />
              </RadioGroup>
              <FormHelperText sx={formHeperTextStyles}>
                {(formik.touched.bloodType && formik.errors.bloodType) || ' '}
              </FormHelperText>
            </FormControl>
          </div>
        </div>
        <div className={css.button}>
          <Button type="submit" variant="contained">
            {t('btnText') ?? 'Start losing weight'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;
