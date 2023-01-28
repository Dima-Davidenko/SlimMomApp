import * as yup from 'yup';
export const schemaLogin = yup.object().shape({
  email: yup.string().email('Uncorrect format').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Should be more then 8 symbols')
    .max(20, 'Too many symbols')
    .required('Password is required'),
});

export const schemaRegistration = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zа-яA-ZА-Яіє'ї ]+$/, 'Should include only symbols')
    .min(3, 'Should exceed 3 letters')
    .max(30, 'Should not exceed 30 letters')
    .required('Name is required'),
  email: yup.string().email('Uncorrect format').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Should be more then 8 symbols')
    .max(20, 'Too many symbols')
    .required('Password is required'),
  confirm: yup
    .string()
    .required('Confirm is required')
    .oneOf([yup.ref('password'), null], 'Passwords are different'),
});

export const schemaCalculator = yup.object().shape({
  weight: yup
    .number()
    .typeError('Must be a number')
    .integer()
    .min(20, 'Should exceed 19')
    .max(500, 'Should not exceed 500')
    .required('This field is required'),
  desiredWeight: yup
    .number()
    .typeError('Must be a number')
    .integer()
    .min(20, 'Should exceed 19')
    .max(500, 'Should not exceed 500')
    .required('This field is required'),
  height: yup
    .number()
    .typeError('Must be a number')
    .integer()
    .min(100, 'Should exceed 99')
    .max(250, 'Should not exceed 250')
    .required('This field is required'),
  age: yup
    .number()
    .typeError('Must be a number')
    .integer()
    .min(18, 'Should exceed 17')
    .max(100, 'Should not exceed 100')
    .required('This field is required'),
  bloodType: yup
    .number()
    .typeError('This field is required')
    .oneOf([1, 2, 3, 4])
    .required('This field is required'),
});
