import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: ${(p) => p.theme.space[3]}px;
  padding: ${(p) => p.theme.space[2]}px;
`;
