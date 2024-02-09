import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 100vw;
  margin: ${(p) => p.theme.space[0]}px auto;
  padding: ${(p) => p.theme.space[0]}px ${(p) => p.theme.space[4]}px;
`;
