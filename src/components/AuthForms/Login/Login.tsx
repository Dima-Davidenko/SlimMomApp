import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { Button, TextField } from '@mui/material';

import css from '../formAuth.module.css';
import { inputStyles } from '../form.styles';

import { schemaLogin } from '../../../assets/validation/schemas';

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schemaLogin,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(false);
    },
    validateOnBlur: true,
  });
  return (
    <>
      <h2 className={css.title}>Log In</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={css.inputWrp}>
          <TextField
            name="email"
            label="Email "
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={(formik.touched.email && formik.errors.email) || ' '}
            sx={inputStyles}
          />
          <TextField
            name="password"
            label="Password "
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={(formik.touched.password && formik.errors.password) || ' '}
            sx={inputStyles}
          />
        </div>

        <div className={css.btnWrp}>
          <Button type="submit" variant="contained">
            Log in
          </Button>
          <Button variant="outlined" onClick={() => navigate('/registration')}>
            Registration
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
