import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${(p) => p.theme.colors.lightgray};
  max-width: 100vw;
  max-height: 100vh;
  margin: ${(p) => p.theme.space[0]}px auto;
  padding: ${(p) => p.theme.space[0]}px ${(p) => p.theme.space[0]}px;
`;
