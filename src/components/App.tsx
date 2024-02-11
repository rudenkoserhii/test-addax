import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { LayOut } from './LayOut/LayOut';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { refreshUser } from 'store/auth/operations';
import { useAuth } from 'hooks';
import { AppDispatch } from 'store/store';

const HomePage = lazy(() => import('pages/Home/Home'));
const SignUpPage = lazy(() => import('pages/SignUp/SignUp'));
const LogInPage = lazy(() => import('pages/LogIn/LogIn'));
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
          path="/signup"
          element={<RestrictedRoute redirectTo="/calendar" component={<SignUpPage />} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/calendar" component={<LogInPage />} />}
        />
        {/* <Route
          path="/calendar"
          element={<PrivateRoute redirectTo="/login" component={<CalendarPage />} />}
        /> */}
        <Route path="/calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
};
