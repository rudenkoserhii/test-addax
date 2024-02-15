import { useDispatch } from 'react-redux';
import { logOut } from 'store/auth/operations';
import { useAuth } from 'hooks';
import { Wrapper, Text, ButtonStyled, Span } from './UserMenu.styled';
import { AppDispatch } from 'store/store';
import axios from 'axios';

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
        onClick={() => {
          axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;
          dispatch(logOut());
        }}
      >
        Logout
      </ButtonStyled>
    </Wrapper>
  );
};
