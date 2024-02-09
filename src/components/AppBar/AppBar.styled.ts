import styled from 'styled-components';

export const HeaderStyled = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  padding: ${(p) => p.theme.space[3]}px;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 100vw;
    height: 1px;
    background-color: ${(p) => p.theme.colors.grey};
  }
`;
