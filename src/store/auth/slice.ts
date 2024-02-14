import { createSlice } from '@reduxjs/toolkit';
import { signUp, logIn, logOut, refreshUser } from 'store/auth/operations';

const handlePending = (state: StateAuth) => {
  state.isLoading = true;
};

export type StateAuth = {
  user: { name?: string | null; email: string | null; country: string | null };
  token: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isRefreshing: boolean;
};

const initialState: StateAuth = {
  user: { name: null, email: null, country: null },
  token: null,
  isLoading: false,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, handlePending)
      .addCase(logIn.pending, handlePending)

      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = { name: null, email: null, country: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
