import { Contact } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { createContact, fetchContacts } from './contactsThunks';

export interface ContactsState {
  contacts: Contact[];
  fetchLoading: boolean;
  deleteLoading: false | string;
  createLoading: boolean;
}

const initialState: ContactsState = {
  contacts: [],
  fetchLoading: false,
  deleteLoading: false,
  createLoading: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload: contacts }) => {
        state.fetchLoading = false;
        state.contacts = contacts;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(createContact.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createContact.rejected, (state) => {
        state.createLoading = false;
      });
  },
  selectors: {
    selectContacts: (state) => state.contacts,
    selectFetchContactsLoading: (state) => state.fetchLoading,
    selectCreateContactLoading: (state) => state.createLoading,
  },
});

export const contactsReducer = contactsSlice.reducer;

export const {
  selectContacts,
  selectFetchContactsLoading,
  selectCreateContactLoading,
} = contactsSlice.selectors;
