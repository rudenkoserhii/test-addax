import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import axios, { AxiosError } from 'axios';
import { Task, WeekOrMonthRequest } from 'types';
console.log('REACT_APP_NAGER_URL:', process.env.REACT_APP_NAGER_URL);
console.log('REACT_APP_BACKEND_HOST:', process.env.REACT_APP_BACKEND_HOST);
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;

export const getTasks = createAsyncThunk(
  'getTasks',
  async (objectWeekOrMonth: WeekOrMonthRequest, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    try {
      const response = await axios.get('/calendar', { data: objectWeekOrMonth });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).message);
    }
  }
);

export const addTask = createAsyncThunk(
  'addTask',
  async (objTask: Task, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    try {
      const response = await axios.post('/calendar', objTask);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'deleteTask',
  async (taskId: string, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    try {
      const response = await axios.delete(`/calendar/${taskId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).message);
    }
  }
);

export const editTask = createAsyncThunk(
  'editTask',
  async (objTask: Task, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    try {
      const response = await axios.patch(`/calendar/${objTask.id}`, objTask);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).message);
    }
  }
);
