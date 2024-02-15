import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { LayOut } from 'components/LayOut/LayOut';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';
import { refreshUser } from 'store/auth/operations';
import { useAuth } from 'hooks';
import { AppDispatch } from 'store/store';
import axios from 'axios';
import { Loading } from 'components/Loading/Loading';
import Notiflix from 'notiflix';

const HomePage = lazy(() => import('pages/Home/Home'));
const LogInPage = lazy(() => import('pages/LogIn/LogIn'));
const SignUpPage = lazy(() => import('pages/SignUp/SignUp'));
const CalendarPage = lazy(() => import('pages/Calendar/Calendar'));

export const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;
        const response = await dispatch(refreshUser());

        if (response.meta.requestStatus === 'rejected') {
          Notiflix.Notify.failure(`Something went wrong - ${response.payload}!`);

          return;
        }
      } catch (error) {
        Notiflix.Notify.failure(`Something went wrong - ${error.message}`);
      }
    })();
  }, [dispatch]);

  return isRefreshing ? (
    <Loading isVisible={true} />
  ) : (
    <Routes>
      <Route path="/" element={<LayOut />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
        <Route
          path="/signup"
          element={<RestrictedRoute redirectTo="/calendar" component={<SignUpPage />} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/calendar" component={<LogInPage />} />}
        />
        <Route
          path="/calendar"
          element={<PrivateRoute redirectTo="/login" component={<CalendarPage />} />}
        />
      </Route>
    </Routes>
  );
};
