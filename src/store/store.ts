import { Action, ThunkAction, UnknownAction, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { tasksReducer } from 'store/tasks/slice';
import { filterSlice } from 'store/filter/slice';
import { StateAuth, authReducer } from 'store/auth/slice';

export type RootState = ReturnType<typeof store.getState>;

const authPersistConfig: PersistConfig<StateAuth> = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer<StateAuth, UnknownAction>(authPersistConfig, authReducer),
    tasks: tasksReducer,
    filter: filterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
