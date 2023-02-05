import { ThemeProvider } from '@mui/material';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/AuthForms/Login/Login';
import Registration from './components/AuthForms/Registration/Registration';
import Calculator from './components/Calculator/Calculator';
import DailyRateCalc from './components/DailyRateCalc/DailyRateCalc';
import DaySummary from './components/DaySummary/DaySummary';
import Diary from './components/Diary/Diary';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import ProtectedRoute from './components/Routes/ProtectedRoute/ProtectedRoute';
import SharedLayout from './components/SharedLayout/SharedLayout';
import './i18n/config';
import { refreshUser } from './redux/auth/authOperations';
import { selectIsLoggedIn, selectSid } from './redux/auth/authSelectors';
import { useAppDispatch } from './redux/store/store';
import { selectCurrentTheme } from './redux/theme/themeSelectors';
import { darkTheme, lightTheme } from './theme/theme';
import { setHtmlTagClassname, storageThemeKeyName } from './theme/themeSwitch';
import { ThemeNames } from './types/themeNames';
const App: React.FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentTheme = useSelector(selectCurrentTheme);
  useEffect(() => {
    if (localStorage.getItem(storageThemeKeyName) === ThemeNames.darkTheme) {
      setHtmlTagClassname(ThemeNames.darkTheme);
    } else {
      setHtmlTagClassname(ThemeNames.lightTheme);
    }
  }, []);
  let isRefreshing = useRef(false);
  const sid = useSelector(selectSid);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isLoggedIn && sid && !isRefreshing.current) {
      isRefreshing.current = true;
      dispatch(refreshUser(sid));
    }
  }, [dispatch, isLoggedIn, sid]);
  return (
    <ThemeProvider theme={currentTheme === ThemeNames.darkTheme ? darkTheme : lightTheme}>
      <div className={clsx({ backgroundImg: !isLoggedIn })}>
        <div className="appContainer">
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route
                index
                element={
                  <ProtectedRoute defaultRoute="/diary">
                    <DailyRateCalc />
                  </ProtectedRoute>
                }
              />
              <Route
                path="login"
                element={
                  <ProtectedRoute defaultRoute="/diary">
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="registration"
                element={
                  <ProtectedRoute defaultRoute="/diary">
                    <Registration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="diary"
                element={
                  <PrivateRoute defaultRoute="/">
                    <Diary />
                    <DaySummary />
                  </PrivateRoute>
                }
              />
              <Route
                path="calculator"
                element={
                  <PrivateRoute defaultRoute="/">
                    <Calculator />
                    <DaySummary />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
};

export default App;
