import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as SignUp } from 'assets/icons/sign-up.svg';
import { ReactComponent as LogIn } from 'assets/icons/log-in.svg';

export const NavLinkStyled = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  padding: ${(p) => p.theme.space[4]}px;

  &.active > svg > path {
    fill: ${(p) => p.theme.colors.lightblue};
    transition: all 200ms ease-in;
  }

  & > svg > path {
    fill: ${(p) => p.theme.colors.grey};
    transition: all 200ms ease-in;
  }
  &:hover:not(.active) {
    & > svg > path {
      transition: all 200ms ease-in;

      fill: ${(p) => p.theme.colors.blue};
    }
  }
`;

export const IconSignUpStyled = styled(SignUp)`
  width: auto;
  height: ${(p) => p.theme.space[5]}px;
`;

export const IconLogInStyled = styled(LogIn)`
  width: auto;
  height: ${(p) => p.theme.space[5]}px;
`;
