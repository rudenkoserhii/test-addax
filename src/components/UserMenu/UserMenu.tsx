import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import { Wrapper, Text, ButtonStyled, Span } from './UserMenu.styled';
import { AppDispatch } from 'redux/store';

export const UserMenu = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();

  return (
    <Wrapper>
      <Text>
        Welcome, <Span>{user.name}</Span>
      </Text>
      <ButtonStyled type="button" onClick={() => dispatch(logOut())}>
        Logout
      </ButtonStyled>
    </Wrapper>
  );
};
