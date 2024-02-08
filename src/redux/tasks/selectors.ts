import { RootState } from 'redux/store';

export const selectLoading = (state: RootState) => state.tasks.isLoading;
export const selectAllContacts = (state: RootState) => state.tasks.tasks;
