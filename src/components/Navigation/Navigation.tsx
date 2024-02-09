import { useAuth } from 'hooks';
import { NavLinkStyled } from './Navigation.styled';

export const Navigation = (): JSX.Element => {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <NavLinkStyled to="/">Home</NavLinkStyled>
      {isLoggedIn && <NavLinkStyled to="/calendar">Contacts</NavLinkStyled>}
    </nav>
  );
};
