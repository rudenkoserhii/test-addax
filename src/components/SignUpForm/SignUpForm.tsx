import { useDispatch, useSelector } from 'react-redux';
import { signUp } from 'store/auth/operations';
import {
  FormStyled,
  LabelStyled,
  InputStyled,
  ButtonStyled,
  SelectStyled,
  Wrapper,
  Placeholder,
} from './SignUpForm.styled';
import { AppDispatch } from 'store/store';
import { FormEvent, useEffect } from 'react';
import { FormElements } from 'types';
import { getCountries } from 'store/holidays/operations';
import { selectAllCountries, selectLoading } from 'store/holidays/selectors';
import { Loading } from 'components/Loading/Loading';
import { selectIsLoading } from 'store/auth/selectors';
import { nanoid } from 'nanoid';
import axios from 'axios';

export const SignUpForm = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const isLoadingWithCountries = useSelector(selectLoading);
  const isLoadingWithSignUp = useSelector(selectIsLoading);
  const countries = useSelector(selectAllCountries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as FormElements;

    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;

    dispatch(
      signUp({
        name: formElements?.name?.value,
        email: formElements?.email?.value,
        password: formElements?.password?.value,
        country: formElements?.country?.value,
      })
    );
    form.reset();
  };

  return (
    <Wrapper>
      <FormStyled onSubmit={handleSubmit} autoComplete="off">
        <LabelStyled
          htmlFor="name"
          onFocus={(event) => {
            (event.target.previousSibling as HTMLDivElement).style.visibility = 'visible';

            event.target.removeAttribute('placeholder');
          }}
          onBlur={(event) => {
            (event.target.previousSibling as HTMLDivElement).style.visibility = 'hidden';
            event.target.setAttribute('placeholder', 'Enter your name');
          }}
        >
          <Placeholder>Enter your name</Placeholder>
          <InputStyled
            type="text"
            name="name"
            placeholder="Enter your name"
            id="name"
            required
            maxLength={20}
            minLength={2}
          />
        </LabelStyled>
        <LabelStyled
          htmlFor="email"
          onFocus={(event) => {
            (event.target.previousSibling as HTMLDivElement).style.visibility = 'visible';

            event.target.removeAttribute('placeholder');
          }}
          onBlur={(event) => {
            (event.target.previousSibling as HTMLDivElement).style.visibility = 'hidden';
            event.target.setAttribute('placeholder', 'Enter your email');
          }}
        >
          <Placeholder>Enter your email</Placeholder>
          <InputStyled
            type="email"
            name="email"
            placeholder="Enter your email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            title="Invalid email address"
            id="email"
            required
          />
        </LabelStyled>
        <LabelStyled
          htmlFor="password"
          onFocus={(event) => {
            (event.target.previousSibling as HTMLDivElement).style.visibility = 'visible';

            event.target.removeAttribute('placeholder');
          }}
          onBlur={(event) => {
            (event.target.previousSibling as HTMLDivElement).style.visibility = 'hidden';
            event.target.setAttribute('placeholder', 'Enter your password');
          }}
        >
          <Placeholder>Enter your password</Placeholder>
          <InputStyled
            type="password"
            name="password"
            placeholder="Enter your password"
            id="password"
            required
            maxLength={20}
            minLength={8}
          />
        </LabelStyled>
        <LabelStyled htmlFor="country">
          <SelectStyled name="country" defaultValue="" required id="country">
            <option value="" disabled hidden>
              Enter your country
            </option>
            {countries.map((country) => (
              <option key={nanoid()} value={country.countryCode}>
                {country.name}
              </option>
            ))}
          </SelectStyled>
        </LabelStyled>
        <ButtonStyled type="submit">Sign Up</ButtonStyled>
        <Loading isVisible={isLoadingWithCountries || isLoadingWithSignUp} />
      </FormStyled>
    </Wrapper>
  );
};
