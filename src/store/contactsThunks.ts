import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiContact, ApiContacts, Contact } from '../types';
import { RootState } from '../app/store';
import axiosApi from '../axiosApi';

export const fetchContacts = createAsyncThunk<
  Contact[],
  void,
  { state: RootState }
>('contacts/fetchContacts', async () => {
  const contactsResponse = await axiosApi.get<ApiContacts | null>(
    '/contacts.json',
  );
  const contacts = contactsResponse.data;

  let newContacts: Contact[] = [];

  if (contacts) {
    newContacts = Object.keys(contacts).map((id: string) => {
      const dish = contacts[id];
      return {
        id: id,
        ...dish,
      };
    });
  }
  return newContacts;
});

export const createContact = createAsyncThunk<void, ApiContact>(
  'contacts/create',
  async (apiContact) => {
    await axiosApi.post('/contacts.json', apiContact);
  },
);
