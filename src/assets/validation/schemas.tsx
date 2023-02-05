import { TFunction } from 'i18next';
import * as yup from 'yup';

export const schemaRegistration = (t: TFunction) => {
  return yup.object().shape({
    name: yup
      .string()
      .typeError(t('err') ?? 'Wrong format.')
      .min(3, `${t('min')} 3.` ?? 'Min length 3.')
      .max(254, `${t('max')} 254.` ?? 'Max length 254.')
      .required(t('required') ?? 'Required.'),
    email: yup
      .string()
      .typeError(t('err') ?? 'Wrong format.')
      .min(3, `${t('min')} 3.` ?? 'Min length 3.')
      .max(254, `${t('max')} 254.` ?? 'Max length 254.')
      .email(t('err') ?? 'Wrong format.')
      .required(t('required') ?? 'Required.'),
    password: yup
      .string()
      .typeError(t('err') ?? 'Wrong format.')
      .min(8, `${t('min')} 8.` ?? 'Min length 8.')
      .max(100, `${t('max')} 100.` ?? 'Max length 100.')
      .required(t('required') ?? 'Required.'),
    confirm: yup
      .string()
      .oneOf([yup.ref('password'), null], t('input.confirm.err') ?? 'Passwords are different.')
      .required(t('required') ?? 'Required.'),
  });
};
export const schemaLogin = (t: TFunction) => {
  return yup.object().shape({
    email: yup
      .string()
      .typeError(t('err') ?? 'Wrong format.')
      .min(3, `${t('min')} 3.` ?? 'Min length 3.')
      .max(254, `${t('max')} 254.` ?? 'Max length 254.')
      .email(t('err') ?? 'Wrong format.')
      .required(t('required') ?? 'Required.'),
    password: yup
      .string()
      .typeError(t('err') ?? 'Wrong format.')
      .min(8, `${t('min')} 8.` ?? 'Min length 8.')
      .max(100, `${t('max')} 100.` ?? 'Max length 100.')
      .required(t('required') ?? 'Required.'),
  });
};
export const schemaCalculator = (t: TFunction) => {
  return yup.object().shape({
    weight: yup
      .number()
      .typeError(t('form.numberOnly') ?? 'Number only')
      .required(t('form.req') ?? 'This field is required')
      .positive(t('form.positive') ?? 'Must be a positive number')
      .min(20, ` ${t('form.min')} 20` ?? 'Value must be more than 20')
      .max(500, ` ${t('form.max')} 500` ?? 'Max value is 500')
      .integer(t('form.integer') ?? 'Only integer.'),
    desiredWeight: yup
      .number()
      .typeError(t('form.numberOnly') ?? 'Number only')
      .required(t('form.req') ?? 'This field is required')
      .positive(t('form.positive') ?? 'Must be a positive number')
      .min(20, ` ${t('form.min')} 20` ?? 'Value must be more than 20')
      .max(500, ` ${t('form.max')} 500` ?? 'Max value is 500')
      .integer(t('form.integer') ?? 'Only integer.'),
    height: yup
      .number()
      .typeError(t('form.numberOnly') ?? 'Number only')
      .required(t('form.req') ?? 'This field is required')
      .positive(t('form.positive') ?? 'Must be a positive number')
      .min(100, ` ${t('form.min')} 100` ?? 'Value must be more than 100')
      .max(250, ` ${t('form.max')} 250` ?? 'Max value is 250')
      .integer(t('form.integer') ?? 'Only integer.'),
    age: yup
      .number()
      .typeError(t('form.numberOnly') ?? 'Number only')
      .required(t('form.req') ?? 'This field is required')
      .positive(t('form.positive') ?? 'Must be a positive number')
      .min(18, t('form.minAge') ?? 'You must be of legal age (18 years)')
      .max(100, ` ${t('form.max')} 100` ?? 'Max value is 100')
      .integer(t('form.integer') ?? 'Only integer.'),
    bloodType: yup
      .number()
      .typeError(t('form.req') ?? 'This field is required')
      .oneOf([1, 2, 3, 4], t('form.bloodTypeErr') ?? 'Choose blood type')
      .required(t('form.req') ?? 'This field is required'),
  });
};

export const schemaAddProduct = (t: TFunction) => {
  return yup.object().shape({
    weight: yup
      .number()
      .typeError(t('calc.form.err') ?? 'Wrong format.')
      .positive(t('calc.form.positive') ?? 'Must be a positive number')
      .integer(t('calc.form.integer') ?? 'Only integer.')
      .max(3000, ` ${t('calc.form.max')} 3000` ?? 'Max value is 3000')
      .required(t('calc.form.req') ?? 'This field is required'),
  });
};
