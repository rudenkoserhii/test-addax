import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {value: ""},
  reducers: {
    addFilter(state, action) {
      state.value = action.payload.toLowerCase()
    },
  },
});

export const { addFilter } = filterSlice.actions;