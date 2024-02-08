import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LoginForm } from 'components/LoginForm/LoginForm';

export default function Login() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Log In</title>
        </Helmet>
        <LoginForm />
      </HelmetProvider>
    </div>
  );
}
