import React from 'react';
import { useFormik } from 'formik';

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

import { IUserData } from '../../types/userInfo';
import { schemaCalculator } from '../../assets/validation/schemas';

interface IProps {
  onFormSubmit: Function;
  userData: IUserData | null;
}
interface IInitValues {
  age: string | number;
  height: string | number;
  weight: string | number;
  desiredWeight: string | number;
  bloodType: number | null;
}

const CalculatorForm: React.FC<IProps> = ({ onFormSubmit, userData }) => {
  let initialValues: IInitValues = {
    age: '',
    height: '',
    weight: '',
    desiredWeight: '',
    bloodType: null,
  };
  if (userData) {
    const { age, height, weight, desiredWeight, bloodType } = userData;
    initialValues = { age, height, weight, desiredWeight, bloodType };
  }
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: schemaCalculator,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      onFormSubmit(values);
      setSubmitting(false);
      resetForm();
    },
    validateOnBlur: true,
  });
  return (
    <div className={css.container}>
      <h2 className={css.formTitle}>Calculate your daily calorie intake right now</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={css.inputsWrapper}>
          <div>
            <TextField
              id="form__input-height"
              name="height"
              label="Height"
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
              label="Age"
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
              label="Current weight"
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
              label="Desired weight"
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
              <FormLabel id="bloodType-label">Blood type</FormLabel>
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
            Start loosing weight
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;
