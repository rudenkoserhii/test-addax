import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import axios, { AxiosError } from 'axios';
import { Task } from 'types';

export const getTasks = createAsyncThunk(
  'calendar/getTasks',
  async (_, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    try {
      const res = await axios.get('/calendar');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).message);
    }
  }
);

export const addTask = createAsyncThunk(
  'calendar/addTask',
  async (objTask, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
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
