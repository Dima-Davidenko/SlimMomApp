import { ThemeProvider } from '@mui/material';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Login from './components/AuthForms/Login/Login';
import Registration from './components/AuthForms/Registration/Registration';
import DailyRateCalc from './components/DailyRateCalc/DailyRateCalc';
import ProtectedRoute from './components/Routes/ProtectedRoute/ProtectedRoute';
import SharedLayout from './components/SharedLayout/SharedLayout';
import { useAppDispatch } from './redux/store/store';
import { selectCurrentTheme } from './redux/theme/themeSelectors';
import { darkTheme, lightTheme } from './theme/theme';
import { setHtmlTagClassname, storageThemeKeyName } from './theme/themeSwitch';
import { ThemeNames } from './types/themeNames';

const App: React.FC = () => {
  const isLoggedIn = false;
  const currentTheme = useSelector(selectCurrentTheme);
  useEffect(() => {
    if (localStorage.getItem(storageThemeKeyName) === ThemeNames.darkTheme) {
      setHtmlTagClassname(ThemeNames.darkTheme);
    } else {
      setHtmlTagClassname(ThemeNames.lightTheme);
    }
  }, []);

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
            </Route>
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
