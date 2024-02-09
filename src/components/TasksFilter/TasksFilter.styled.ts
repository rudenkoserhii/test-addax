import styled from 'styled-components';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

export const InputStyled = styled.input`
  /* flex-grow: 1; */
  height: ${(p) => p.theme.space[10]}px;
  padding: ${(p) => p.theme.space[0]}px ${(p) => p.theme.space[10]}px ${(p) => p.theme.space[0]}px
    ${(p) => p.theme.space[3]}px;
  border: 0;
  border-radius: ${(p) => p.theme.radii.normal};
  font: inherit;
  line-height: ${(p) => p.theme.lineHeights.body};
  letter-spacing: 0.01em;
  resize: none;
  &:focus-visible {
    outline: 1px solid ${(p) => p.theme.colors.lightblue};
  }
  /* margin-bottom: ${(p) => p.theme.space[4]}px; */
`;

export const LabelStyled = styled.label`
  position: relative;
  margin-right: auto;
`;

export const IconSearchStyled = styled(SearchIcon)`
  height: ${(p) => p.theme.space[5]}px;
  width: auto;
`;

export const Button = styled.button`
  all: unset;
  appearance: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${(p) => p.theme.space[3]}px;
  transition: all 200ms ease-in;
  & > svg > path {
    fill: ${(p) => p.theme.colors.lightblue};
    transition: all 200ms ease-in;
  }
  &:hover {
    & > svg > path {
      transition: all 200ms ease-in;

      fill: ${(p) => p.theme.colors.blue};
    }
  }
`;
