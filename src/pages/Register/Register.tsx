import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RegisterForm } from 'components/RegisterForm/RegisterForm';

export default function Register() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <RegisterForm />
      </HelmetProvider>
    </div>
  );
}
