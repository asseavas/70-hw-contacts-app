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

export const fetchOneContact = createAsyncThunk<ApiContact, string>(
  'contacts/fetchOne',
  async (id) => {
    const { data: contact } = await axiosApi.get<ApiContact | null>(
      `/contacts/${id}.json`,
    );

    if (contact === null) {
      throw new Error('Not found');
    }

    return contact;
  },
);

export interface UpdateContactArg {
  id: string;
  apiContact: ApiContact;
}

export const updateContact = createAsyncThunk<void, UpdateContactArg>(
  'contacts/update',
  async ({ id, apiContact }) => {
    await axiosApi.put(`/contacts/${id}.json`, apiContact);
  },
);

export const deleteContact = createAsyncThunk<void, string>(
  'contacts/deleteContact',
  async (contactId) => {
    await axiosApi.delete(`/contacts/${contactId}.json`);
  },
);
