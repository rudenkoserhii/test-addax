import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import { FormStyled, LabelStyled, InputStyled, ButtonStyled } from './LoginForm.styled';
import { AppDispatch } from 'redux/store';
import { FormEvent } from 'react';
import { FormElements } from 'types';

export const LoginForm = () => {
  const dispatch: AppDispatch = useDispatch();

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
    </FormStyled>
  );
};
