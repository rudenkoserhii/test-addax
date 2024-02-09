import { RootState } from 'store/store';

export const selectLoading = (state: RootState) => state.tasks.isLoading;
export const selectAllContacts = (state: RootState) => state.tasks.tasks;
