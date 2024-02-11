import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: { value: '', color: '' },
  reducers: {
    addFilter(state, action) {
      state.value = action.payload.toLowerCase();
    },
    addColor(state, action) {
      state.color = action.payload.toLowerCase();
    },
  },
});

export const { addFilter, addColor } = filterSlice.actions;