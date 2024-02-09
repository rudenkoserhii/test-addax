import {
  NavLinkStyled,
  IconLogInStyled,
  IconSignUpStyled,
} from 'components/AuthNav/AuthNav.styled';

export const AuthNav = (): JSX.Element => (
  <div>
    <NavLinkStyled to="/signup" title="Sign Up">
      <IconSignUpStyled />
    </NavLinkStyled>
    <NavLinkStyled to="/login" title="Log In">
      <IconLogInStyled />
    </NavLinkStyled>
  </div>
);
