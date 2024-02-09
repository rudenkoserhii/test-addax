import { useDispatch } from 'react-redux';
import { logOut } from 'store/auth/operations';
import { useAuth } from 'hooks';
import { Wrapper, Text, ButtonStyled, Span } from './UserMenu.styled';
import { AppDispatch } from 'store/store';

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
