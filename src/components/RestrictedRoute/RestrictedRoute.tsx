import { useAuth } from 'hooks';
import { Navigate } from 'react-router-dom';

export const RestrictedRoute = ({
  component: Component,
  redirectTo = '/',
}: {
  component: JSX.Element;
  redirectTo: string;
}) => {
  const { isLoggedIn } = useAuth();
  // const isLoggedIn = true;

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
