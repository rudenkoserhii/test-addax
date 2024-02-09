import styled from 'styled-components';
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';
import { Link } from 'react-router-dom';

export const WrapperLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;

  display: flex;
  align-items: center;
  width: fit-content;
  gap: ${(p) => p.theme.space[3]}px;
  padding: ${(p) => p.theme.space[2]}px;
`;

export const LogoStyled = styled(LogoIcon)`
  height: ${(p) => p.theme.space[6]}px;
  width: auto;
`;

export const TextBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: fit-content;
  gap: ${(p) => p.theme.space[1]}px;
`;

export const TextTitle = styled.p`
  color: ${(p) => p.theme.colors.black};

  display: block;
  text-align: left;
  width: fit-content;
  font-weight: ${(p) => p.theme.fontWeights.extrabold};
  font-size: ${(p) => p.theme.fontSizes.ml};
  padding: 0;
  margin: 0;
`;

export const TextSlogan = styled.p`
  color: ${(p) => p.theme.colors.grey};

  display: block;
  text-align: left;
  width: fit-content;
  font-weight: ${(p) => p.theme.fontWeights.normal};
  font-size: ${(p) => p.theme.fontSizes.xs};
  padding: 0;
  margin: 0;
`;
