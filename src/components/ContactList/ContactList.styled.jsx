import styled from 'styled-components';

export const ContactListStyled = styled.ul`
  padding: ${p => p.theme.space[0]}px;
  margin: ${p => p.theme.space[0]}px;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${p => p.theme.space[3]}px;
`;

export const Li = styled.li`
`;
