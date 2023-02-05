import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { Button, TextField } from '@mui/material';

import { inputStyles } from '../form.styles';
import css from '../formAuth.module.css';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { schemaLogin } from '../../../assets/validation/schemas';
import { logIn } from '../../../redux/auth/authOperations';
import { selectIsRefreshing } from '../../../redux/auth/authSelectors';
import { useAppDispatch } from '../../../redux/store/store';

const Login = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'auth' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lang = useRef('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schemaLogin(t),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      dispatch(logIn(values));
      setSubmitting(false);
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
      <h2 className={css.title}>{t('title.login')}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={css.inputWrp}>
          <TextField
            name="email"
            label={t('input.email.label')}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={(formik.touched.email && formik.errors.email) || ' '}
            sx={inputStyles}
          />
          <TextField
            name="password"
            label={t('input.pass.label')}
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={(formik.touched.password && formik.errors.password) || ' '}
            sx={inputStyles}
          />
        </div>

        <div className={css.btnWrp}>
          <Button type="submit" variant="contained" disabled={isRefreshing}>
            {t('title.login')}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/registration')}
            disabled={isRefreshing}
          >
            {t('title.registration')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
