import { useDispatch } from 'react-redux';
import { logOut } from 'store/auth/operations';
import { useAuth } from 'hooks';
import { Wrapper, Text, ButtonStyled, Span } from './UserMenu.styled';
import { AppDispatch } from 'store/store';
import axios from 'axios';
import Notiflix from 'notiflix';

export const UserMenu = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();

  return (
    <Wrapper>
      <Text>
        Welcome, <Span>{user.name}</Span>
      </Text>
      <ButtonStyled
        type="button"
        onClick={async () => {
          try {
            axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;

            const response = await dispatch(logOut());

            if (response.meta.requestStatus === 'rejected') {
              Notiflix.Notify.failure(`Something went wrong - ${response.payload}!`);

              return;
            }
          } catch (error) {
            Notiflix.Notify.failure(`Something went wrong - ${error.message}`);
          }
        }}
      >
        Logout
      </ButtonStyled>
    </Wrapper>
  );
};
