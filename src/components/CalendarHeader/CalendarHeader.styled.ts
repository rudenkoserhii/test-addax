import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space[3]}px;
  padding: ${(p) => p.theme.space[2]}px;
  border: ${(p) => p.theme.borders.grey};
  border-radius: ${(p) => p.theme.radii.normal};
`;
