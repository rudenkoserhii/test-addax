import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavLinkStyled = styled(NavLink)`
    display: inline-block;
    text-decoration: none;
    padding: ${p => p.theme.space[4]}px;
    font-weight: ${p => p.theme.fontWeights.bold};
    color: ${p => p.theme.colors.grey};

    &.active {
    color: ${p => p.theme.colors.lightblue};
    }

    :hover:not(.active) {
    color: ${p => p.theme.colors.blue};
    }

`;
