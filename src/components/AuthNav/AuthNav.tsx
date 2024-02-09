import { NavLinkStyled } from 'components/AuthNav/AuthNav.styled';

export const AuthNav = (): JSX.Element => {
  return (
    <div>
      <NavLinkStyled to="/register">Sign Up</NavLinkStyled>
      <NavLinkStyled to="/login">Log In</NavLinkStyled>
    </div>
  );
};
