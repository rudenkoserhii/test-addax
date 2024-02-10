import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: ${(p) => p.theme.space[5]}px;
`;

export const Table = styled.table`
  width: 100%;
  height: calc(100vh - ${(p) => p.theme.space[12]}px);

  border-collapse: collapse;
`;

export const TableHead = styled.thead``;

export const CellTitle = styled.th`
  height: ${(p) => p.theme.space[5]}px;
  width: calc(100vw / 7);
  background-color: #f2f2f2;

  outline: 1px solid #ddd;
  padding: ${(p) => p.theme.space[2]}px;
  text-align: center;
`;

export const Cell = styled.td`
  width: calc(100vw / 7);

  outline: 1px solid #ddd;
  padding: ${(p) => p.theme.space[3]}px;
  text-align: center;

  &.empty-day {
    opacity: 0.3;
  }
`;