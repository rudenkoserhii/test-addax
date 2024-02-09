import styled from 'styled-components';
import { ReactComponent as PhotoIcon } from 'assets/icons/photo.svg';

export const IconPhotoStyled = styled(PhotoIcon)`
  height: ${(p) => p.theme.space[5]}px;
  width: auto;
`;

export const Button = styled.button`
  all: unset;
  appearance: none;
  cursor: pointer;
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
