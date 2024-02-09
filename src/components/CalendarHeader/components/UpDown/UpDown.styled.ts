import styled from 'styled-components';
import { ReactComponent as ArrowUp } from 'assets/icons/arrow-up.svg';
import { ReactComponent as ArrowDown } from 'assets/icons/arrow-down.svg';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space[3]}px;
  padding: ${(p) => p.theme.space[2]}px;
`;

export const IconArrowUpStyled = styled(ArrowUp)`
  width: auto;
  height: ${(p) => p.theme.space[5]}px;
  & path {
    fill: ${(p) => p.theme.colors.white};
  }
`;

export const IconArrowDownStyled = styled(ArrowDown)`
  width: auto;
  height: ${(p) => p.theme.space[5]}px;
  & path {
    fill: ${(p) => p.theme.colors.white};
  }
`;
