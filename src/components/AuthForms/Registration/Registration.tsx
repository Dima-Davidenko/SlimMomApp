import { useFormik } from 'formik';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, IconButton, TextField } from '@mui/material';

import { iconEyeStyles, inputStyles } from '../form.styles';
import css from '../formAuth.module.css';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { schemaRegistration } from '../../../assets/validation/schemas';
import { register } from '../../../redux/auth/authOperations';
import { useAppDispatch } from '../../../redux/store/store';

const Registration = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'auth' });
  const lang = useRef('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    },
    validationSchema: schemaRegistration(t),
    onSubmit: ({ name, email, password }, { setSubmitting }) => {
      dispatch(register({ username: name, email, password }));
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
      <h2 className={css.title}>{t('title.registration')}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={css.inputWrp}>
          <TextField
            name="name"
            label={t('input.name.label')}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={(formik.touched.name && formik.errors.name) || ' '}
            sx={inputStyles}
          />
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
          <div className={css.passWrp}>
            <TextField
              name="password"
              label={t('input.pass.label')}
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={(formik.touched.password && formik.errors.password) || ' '}
              sx={inputStyles}
            />
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(showPassword => !showPassword)}
              sx={iconEyeStyles}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
          <div className={css.passWrp}>
            <TextField
              name="confirm"
              label={t('input.confirm.label')}
              type={showConfirm ? 'text' : 'password'}
              value={formik.values.confirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirm && Boolean(formik.errors.confirm)}
              helperText={(formik.touched.confirm && formik.errors.confirm) || ' '}
              sx={inputStyles}
            />
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowConfirm(showConfirm => !showConfirm)}
              sx={iconEyeStyles}
            >
              {showConfirm ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>

        <div className={css.btnWrp}>
          <Button type="submit" variant="contained">
            {t('title.registration')}
          </Button>
          <Button variant="outlined" onClick={() => navigate('/login')}>
            {t('title.login')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
