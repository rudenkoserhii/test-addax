import { RootState } from 'store/store';

export const filterValue = (state: RootState) => state.filter.value;
export const filterColor = (state: RootState) => state.filter.color;
