import { useDispatch } from 'react-redux';
import { signUp } from 'redux/auth/operations';
import { FormStyled, LabelStyled, InputStyled, ButtonStyled } from './RegisterForm.styled';
import { AppDispatch } from 'redux/store';
import { FormEvent } from 'react';
import { FormElements } from 'types';

export const RegisterForm = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as FormElements;
    dispatch(
      signUp({
        name: formElements?.name?.value,
        email: formElements?.email?.value,
        password: formElements?.password?.value,
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
      <ButtonStyled type="submit">Sign Up</ButtonStyled>
    </FormStyled>
  );
};
