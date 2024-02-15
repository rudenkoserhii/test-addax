import { useDispatch, useSelector } from 'react-redux';
import { logIn } from 'store/auth/operations';
import {
  FormStyled,
  LabelStyled,
  InputStyled,
  ButtonStyled,
  Wrapper,
  Placeholder,
} from 'components/LogInForm/LogInForm.styled';
import { AppDispatch } from 'store/store';
import { FormEvent } from 'react';
import { FormElements } from 'types';
import { Loading } from 'components/Loading/Loading';
import { selectIsLoading } from 'store/auth/selectors';
import axios from 'axios';
import Notiflix from 'notiflix';

export const LogInForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoadingWithLogIn = useSelector(selectIsLoading);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as FormElements;

    try {
      axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;

      const response = await dispatch(
        logIn({
          email: formElements?.email?.value,
          password: formElements?.password?.value,
        })
      );

      if (response.meta.requestStatus === 'rejected') {
        Notiflix.Notify.failure(`Something went wrong - ${response.payload}!`);

        return;
      }
    } catch (error) {
      Notiflix.Notify.failure(`Something went wrong - ${error.message}`);
    }

    form.reset();
    Notiflix.Notify.init({
      success: {
        background: 'blue',
      },
    });

    Notiflix.Notify.success('Successfull logining');
  };

  return (
    <Wrapper>
      <FormStyled onSubmit={handleSubmit} autoComplete="off">
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
        <ButtonStyled type="submit">Log In</ButtonStyled>
        <Loading isVisible={isLoadingWithLogIn} />
      </FormStyled>
    </Wrapper>
  );
};
