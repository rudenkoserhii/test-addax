import styled from 'styled-components';

export const HeaderStyled = styled.header `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${p => p.theme.space[4]}px;
  border-bottom: ${p => p.theme.borders.grey};
`;