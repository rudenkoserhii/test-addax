import styled from 'styled-components';

export const ButtonStyled = styled.button<{ 'data-width': number | undefined }>`
  width: ${(p) => p.theme.space[p['data-width'] || 7]}px;
  height: ${(p) => p.theme.space[10]}px;

  border: none;
  font: inherit;
  cursor: pointer;
  outline: none;
  margin-left: auto;
  border-radius: ${(p) => p.theme.radii.normal};
  padding: ${(p) => p.theme.space[2]}px ${(p) => p.theme.space[4]}px;
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

  &.active {
    background-color: ${(p) => p.theme.colors.blue};
    pointer-events: none;
  }
`;

export const TextStyled = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
