import { useAuth } from 'hooks';
import { NavLinkStyled, IconCalendarStyled, IconHomeStyled } from './Navigation.styled';

export const Navigation = (): JSX.Element => {
  // const { isLoggedIn } = useAuth();
  const isLoggedIn = true;

  return (
    <nav>
      <NavLinkStyled to="/" title="Go to Home page">
        <IconHomeStyled />
      </NavLinkStyled>
      {isLoggedIn && (
        <NavLinkStyled to="/calendar" title="Go to Calendar page">
          <IconCalendarStyled />
        </NavLinkStyled>
      )}
    </nav>
  );
};
