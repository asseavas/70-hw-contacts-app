import { ApiContact, Contact } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createContact,
  deleteContact,
  fetchContacts,
  fetchOneContact,
  updateContact,
} from './contactsThunks';

export interface ContactsState {
  contacts: Contact[];
  fetchLoading: boolean;
  deleteLoading: false | string;
  fetchOneLoading: boolean;
  createLoading: boolean;
  oneContact: null | ApiContact;
  updateLoading: boolean;
}

const initialState: ContactsState = {
  contacts: [],
  fetchLoading: false,
  deleteLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  oneContact: null,
  updateLoading: false,
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

    builder
      .addCase(fetchOneContact.pending, (state) => {
        state.oneContact = null;
        state.fetchOneLoading = true;
      })
      .addCase(fetchOneContact.fulfilled, (state, { payload: apiContact }) => {
        state.oneContact = apiContact;
        state.fetchOneLoading = false;
      })
      .addCase(fetchOneContact.rejected, (state) => {
        state.fetchOneLoading = false;
      });

    builder
      .addCase(updateContact.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateContact.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateContact.rejected, (state) => {
        state.updateLoading = false;
      });

    builder
      .addCase(deleteContact.pending, (state, { meta: { arg: contactId } }) => {
        state.deleteLoading = contactId;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteContact.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
  selectors: {
    selectContacts: (state) => state.contacts,
    selectFetchContactsLoading: (state) => state.fetchLoading,
    selectCreateContactLoading: (state) => state.createLoading,
    selectOneContactLoading: (state) => state.fetchOneLoading,
    selectOneContact: (state) => state.oneContact,
    selectUpdateContactLoading: (state) => state.updateLoading,
    selectDeleteContactLoading: (state) => state.deleteLoading,
  },
});

export const contactsReducer = contactsSlice.reducer;

export const {
  selectContacts,
  selectFetchContactsLoading,
  selectCreateContactLoading,
  selectOneContactLoading,
  selectOneContact,
  selectUpdateContactLoading,
  selectDeleteContactLoading,
} = contactsSlice.selectors;
