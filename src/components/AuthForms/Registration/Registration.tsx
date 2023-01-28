import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { Button, IconButton, TextField } from '@mui/material';

import css from '../formAuth.module.css';
import { iconEyeStyles, inputStyles } from '../form.styles';

import { schemaRegistration } from '../../../assets/validation/schemas';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Registration = () => {
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
    validationSchema: schemaRegistration,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(false);
    },
    validateOnBlur: true,
  });
  return (
    <div>
      <h2 className={css.title}>Registration</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={css.inputWrp}>
          <TextField
            name="name"
            label="Name "
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={(formik.touched.name && formik.errors.name) || ' '}
            sx={inputStyles}
          />
          <TextField
            name="email"
            label="Email "
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={(formik.touched.email && formik.errors.email) || ' '}
            sx={inputStyles}
          />
          <div className={css.passWrp}>
            <TextField
              name="password"
              label="Password "
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
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
              label="Confirm password "
              type={showConfirm ? 'text' : 'password'}
              value={formik.values.confirm}
              onChange={formik.handleChange}
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
            Register
          </Button>
          <Button variant="outlined" onClick={() => navigate('/login')}>
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
