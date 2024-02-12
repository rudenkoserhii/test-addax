/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import back from 'assets/images/button_color.png';

export const InputStyled = styled.input`
  height: ${(p) => p.theme.space[10]}px;
  width: ${(p) => p.theme.space[8]}px;
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

export const ButtonColor = styled.button`
  all: unset;
  appearance: none;
  cursor: pointer;
  background-image: ${(p: any) => p['data-color'] === 'black' && `url(${back})`};
  background-size: ${(p) => p.theme.space[5]}px ${(p) => p.theme.space[5]}px;
  background-color: ${(p: any) => (p['data-color'] === 'black' ? 'transparent' : p['data-color'])};
  height: ${(p) => p.theme.space[5]}px;
  width: ${(p) => p.theme.space[5]}px;
  border-radius: ${(p) => p.theme.radii.normal};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${(p) => p.theme.space[3]}px;
  transition: all 200ms ease-in;
  &:hover {
    & > form {
      transition: all 200ms ease-in;
      visibility: visible;
    }
  }
`;

export const SelectStyled = styled.form`
  visibility: hidden;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: calc(${(p) => p.theme.space[5]}px * 4 + ${(p) => p.theme.space[2]}px * 3);
  width: calc(${(p) => p.theme.space[5]}px * 4 + ${(p) => p.theme.space[2]}px * 3);
  gap: ${(p) => p.theme.space[2]}px;
  padding: ${(p) => p.theme.space[3]}px;
  border-radius: ${(p) => p.theme.radii.normal};
  transition: all 200ms ease-in;
`;

export const Option = styled.label`
  cursor: pointer;
  height: ${(p) => p.theme.space[5]}px;
  width: ${(p) => p.theme.space[5]}px;
  background-color: ${(p: any) => p['data-color']};
  border-radius: ${(p) => p.theme.radii.normal};
`;
export const InputRadio = styled.input`
  &:checked + label {
    outline: ${(p) => p.theme.space[2]}px solid ${(p) => p.theme.colors.grey};
  }
  display: none;
`;
