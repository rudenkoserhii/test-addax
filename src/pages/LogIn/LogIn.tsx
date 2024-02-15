import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LogInForm } from 'components/LogInForm/LogInForm';

export default function LogIn() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Log In</title>
        </Helmet>
        <LogInForm />
      </HelmetProvider>
    </div>
  );
}
