import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Home } from 'assets/icons/home.svg';
import { ReactComponent as Calendar } from 'assets/icons/calendar.svg';

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

export const IconHomeStyled = styled(Home)`
  width: auto;
  height: ${(p) => p.theme.space[5]}px;
`;

export const IconCalendarStyled = styled(Calendar)`
  width: auto;
  height: ${(p) => p.theme.space[5]}px;
`;
