import { useDispatch, useSelector } from 'react-redux';
import { logIn } from 'store/auth/operations';
import {
  FormStyled,
  LabelStyled,
  InputStyled,
  ButtonStyled,
} from 'components/LogInForm/LogInForm.styled';
import { AppDispatch } from 'store/store';
import { FormEvent, useEffect } from 'react';
import { FormElements } from 'types';
import { getCountries } from 'store/holidays/operations';
import { Loading } from 'components/Loading/Loading';
import { selectIsLoading } from 'store/auth/selectors';

export const LogInForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoadingWithLogIn = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as FormElements;

    dispatch(
      logIn({
        email: formElements?.email?.value,
        password: formElements?.password?.value,
      })
    );
    form.reset();
  };

  return (
    <FormStyled onSubmit={handleSubmit} autoComplete="off">
      <LabelStyled>
        Email
        <InputStyled type="email" name="email" />
      </LabelStyled>
      <LabelStyled>
        Password
        <InputStyled type="password" name="password" />
      </LabelStyled>
      <ButtonStyled type="submit">Log In</ButtonStyled>
      <Loading isVisible={isLoadingWithLogIn} />
    </FormStyled>
  );
};
