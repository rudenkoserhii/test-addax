import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_NAGER_URL;

export const getHolidays = createAsyncThunk(
  'getHolidays',
  async (
    object: { year: string; countryCode: string },
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => {
    try {
      const response = await axios.get(`/PublicHolidays/${object.year}/${object.countryCode}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).message);
    }
  }
);

export const getCountries = createAsyncThunk(
  'getCountries',
  async (_, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    try {
      const response = await axios.get('/AvailableCountries');

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).message);
    }
  }
);
