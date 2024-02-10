import { createSlice } from '@reduxjs/toolkit';
import { logOut } from 'store/auth/operations';
import { getTasks, addTask, deleteTask, editTask } from './operations';
import { AxiosError } from 'axios';
import { Task } from 'types';

const handlePending = (state: StateTasks) => {
  state.isLoading = true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRejected = (state: StateTasks, action: any) => {
  state.isLoading = false;
  state.error = action.payload;
};

export type StateTasks = {
  tasks: Task[];
  isLoading: boolean;
  error: AxiosError | null;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: <StateTasks>{
    tasks: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, handlePending)
      .addCase(addTask.pending, handlePending)
      .addCase(deleteTask.pending, handlePending)
      .addCase(editTask.pending, handlePending)
      .addCase(getTasks.rejected, handleRejected)
      .addCase(addTask.rejected, handleRejected)
      .addCase(deleteTask.rejected, handleRejected)
      .addCase(editTask.rejected, handleRejected)
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);

        state.tasks.splice(index, 1);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        const task: Task = {
          id: action.payload.id,
          date: action.payload.date,
          title: action.payload.title,
          content: action.payload.content,
          label: action.payload.label,
          order: action.payload.order,
        };

        state.tasks[index] = task;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.tasks = [];
        state.error = null;
        state.isLoading = false;
      });
  },
  reducers: {},
});

export const tasksReducer = tasksSlice.reducer;
