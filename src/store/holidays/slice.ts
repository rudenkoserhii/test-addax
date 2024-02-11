import { createSlice } from '@reduxjs/toolkit';
import { logOut } from 'store/auth/operations';
import { getHolidays, getCountries } from './operations';
import { AxiosError } from 'axios';
import { Country, Holiday } from 'types';

const handlePending = (state: StateHolidays) => {
  state.isLoading = true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRejected = (state: StateHolidays, action: any) => {
  state.isLoading = false;
  state.error = action.payload;
};

export type StateHolidays = {
  holidays: Holiday[];
  countries: Country[];
  isLoading: boolean;
  error: AxiosError | null;
};

const holidaysSlice = createSlice({
  name: 'holidays',
  initialState: <StateHolidays>{
    holidays: [],
    countries: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHolidays.pending, handlePending)
      .addCase(getCountries.pending, handlePending)
      .addCase(getHolidays.rejected, handleRejected)
      .addCase(getCountries.rejected, handleRejected)
      .addCase(getHolidays.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.holidays = action.payload;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.countries = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.holidays = [];
        state.countries = [];
        state.error = null;
        state.isLoading = false;
      });
  },
  reducers: {},
});

export const holidaysReducer = holidaysSlice.reducer;
