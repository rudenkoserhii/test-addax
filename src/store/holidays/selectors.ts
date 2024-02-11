import { RootState } from 'store/store';

export const selectLoading = (state: RootState) => state.holidays.isLoading;
export const selectAllHolidays = (state: RootState) => state.holidays.holidays;
export const selectAllCountries = (state: RootState) => state.holidays.countries;
