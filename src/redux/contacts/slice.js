import { createSlice } from '@reduxjs/toolkit';
import { logOut } from 'redux/auth/operations';
import { fetchContacts, addContact, deleteContact, editContact } from './operations';

const handlePending = state => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
        items: [],
        isLoading: false,
        error: null,
  },
  extraReducers:  (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
    .addCase(addContact.pending, handlePending)
    .addCase(deleteContact.pending, handlePending)
    .addCase(editContact.pending, handlePending)
    .addCase(fetchContacts.rejected, handleRejected)
    .addCase(addContact.rejected, handleRejected)
    .addCase(deleteContact.rejected, handleRejected)
    .addCase(editContact.rejected, handleRejected)
    .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
    })
    .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
    })
    .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
            contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
    })
    .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
            contact => contact.id === action.payload.id
        );
        const item = { 'id': action.payload.id, 'name': action.payload.name, 'number': action.payload.number };
        state.items[index] = item;
    })
    .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
    })
  },
});

export const contactsReducer = contactsSlice.reducer;
