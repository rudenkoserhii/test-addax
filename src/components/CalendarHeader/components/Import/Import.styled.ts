import styled from 'styled-components';
import { ReactComponent as ImportIcon } from 'assets/icons/download.svg';

export const IconImportStyled = styled(ImportIcon)`
  height: ${(p) => p.theme.space[5]}px;
  width: auto;
`;

export const Button = styled.button`
  all: unset;
  appearance: none;
  cursor: pointer;
  margin-right: ${(p) => p.theme.space[2]}px;
  transition: all 200ms ease-in;
  & > svg > path {
    fill: ${(p) => p.theme.colors.grey};
    transition: all 200ms ease-in;
  }
  &:hover {
    & > svg > path {
      transition: all 200ms ease-in;

      fill: ${(p) => p.theme.colors.blue};
    }
  }
`;
