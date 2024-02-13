import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  z-index: 12;
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space[3]}px;
  padding: ${(p) => p.theme.space[2]}px;
`;
