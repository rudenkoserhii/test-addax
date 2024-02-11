import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SignUpForm } from 'components/SignUpForm/SignUpForm';

export default function SignUp() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <SignUpForm />
      </HelmetProvider>
    </div>
  );
}
