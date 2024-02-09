import { NavLinkStyled } from 'components/AuthNav/AuthNav.styled';

export const AuthNav = (): JSX.Element => (
  <div>
    <NavLinkStyled to="/signup">Sign Up</NavLinkStyled>
    <NavLinkStyled to="/login">Log In</NavLinkStyled>
  </div>
);
