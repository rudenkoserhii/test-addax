import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

type CredentialsType = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  country?: string | null;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials: CredentialsType, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    try {
      const res = await axios.post('/users/signup', credentials);

      setAuthHeader(res.data.token);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials: CredentialsType, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    try {
      const res = await axios.post('/users/login', credentials);

      setAuthHeader(res.data.token);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    try {
      await axios.post('/users/logout');

      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    const state = thunkAPI.getState() as RootState;
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).message);
    }
  }
);
