import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import axios, { AxiosError } from 'axios';
import { Task, WeekOrMonthRequest } from 'types';

export const getTasks = createAsyncThunk(
  'calendar/getTasks',
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
  'calendar/addTask',
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
  'calendar/deleteTask',
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
  'calendar/editTask',
  async (objTask: Task, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    try {
      const response = await axios.patch(`/calendar/${objTask.id}`, objTask);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).message);
    }
  }
);
