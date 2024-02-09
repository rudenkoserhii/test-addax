import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { LayOut } from './LayOut/LayOut';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import { AppDispatch } from 'redux/store';

const HomePage = lazy(() => import('pages/Home/Home'));
const RegisterPage = lazy(() => import('pages/Register/Register'));
const LoginPage = lazy(() => import('pages/Login/Login'));
const CalendarPage = lazy(() => import('pages/Calendar/Calendar'));

export const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<LayOut />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
        <Route
          path="/register"
          element={<RestrictedRoute redirectTo="/calendar" component={<RegisterPage />} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/calendar" component={<LoginPage />} />}
        />
        <Route
          path="/calendar"
          element={<PrivateRoute redirectTo="/login" component={<CalendarPage />} />}
        />
      </Route>
    </Routes>
  );
};
