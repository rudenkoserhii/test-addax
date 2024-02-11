import { useDispatch, useSelector } from 'react-redux';
import { signUp } from 'store/auth/operations';
import {
  FormStyled,
  LabelStyled,
  InputStyled,
  ButtonStyled,
  SelectStyled,
} from './SignUpForm.styled';
import { AppDispatch } from 'store/store';
import { FormEvent, useEffect } from 'react';
import { FormElements } from 'types';
import { getCountries } from 'store/holidays/operations';
import { selectAllCountries, selectLoading } from 'store/holidays/selectors';
import { Loading } from 'components/Loading/Loading';
import { selectIsLoading } from 'store/auth/selectors';
import { nanoid } from 'nanoid';

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
    <FormStyled onSubmit={handleSubmit} autoComplete="off">
      <LabelStyled>
        Username
        <InputStyled type="text" name="name" />
      </LabelStyled>
      <LabelStyled>
        Email
        <InputStyled type="email" name="email" />
      </LabelStyled>
      <LabelStyled>
        Password
        <InputStyled type="password" name="password" />
      </LabelStyled>
      <LabelStyled>
        <SelectStyled name="country">
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
  );
};
