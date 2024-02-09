import styled from 'styled-components';

export const ButtonStyled = styled.button`
  width: ${(p) => p.theme.space[7]}px;

  border: none;
  font: inherit;
  cursor: pointer;
  outline: none;
  margin-left: auto;
  border-radius: ${(p) => p.theme.radii.normal};
  padding: ${(p) => p.theme.space[3]}px ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.lightblue};
  color: ${(p) => p.theme.colors.white};
  transition: all 200ms ease-in;

  &:hover,
  &:focus {
    background-color: ${(p) => p.theme.colors.blue};
    transition: all 200ms ease-in;
  }

  &:active {
    ${(p) => p.theme.shadows.second};
  }
`;

export const TextStyled = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
