import styled from 'styled-components';
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';
import { Link } from 'react-router-dom';

export const WrapperLink = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: fit-content;
  gap: ${(p) => p.theme.space[3]}px;
  padding: ${(p) => p.theme.space[2]}px;
`;

export const LogoStyled = styled(LogoIcon)`
  height: ${(p) => p.theme.space[5]}px;
`;

export const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: fit-content;
  gap: ${(p) => p.theme.space[2]}px;
`;

export const TextTitle = styled.p`
  display: block;
  text-align: left;
  width: fit-content;
  font-weight: ${(p) => p.theme.fontWeights.bold};
  font-size: ${(p) => p.theme.fontSizes.l};
`;

export const TextSlogan = styled.p`
  display: block;
  text-align: left;
  width: fit-content;
  font-weight: ${(p) => p.theme.fontWeights.normal};
  font-size: ${(p) => p.theme.fontSizes.m};
`;
