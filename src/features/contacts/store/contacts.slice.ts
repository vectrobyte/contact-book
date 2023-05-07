import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type PaginatedResult } from '@/@types';
import { ContactsState } from '@/features/contacts/store';
import { type RootState } from '@/lib/providers/StoreProvider';
import { type Contact } from '@/server/models';

const ContactsSlice = createSlice({
  name: 'contacts',
  initialState: ContactsState,
  reducers: {
    setPaginatedContacts(state, action: PayloadAction<PaginatedResult<Contact>>) {
      state.contacts = action.payload.data;
      state.pagination = action.payload.meta;
    },
    add(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
      state.pagination.total += 1;
      state.pagination.per_page += 1;
    },
    update(state, action: PayloadAction<Contact>) {
      const index = state.contacts.findIndex((contact) => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    delete(state, action: PayloadAction<Contact>) {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload.id);
      state.pagination.total -= 1;
      state.pagination.per_page -= 1;
    },
  },
});

export const ContactActions = ContactsSlice.actions;
export const ContactsSelector = (state: RootState) => state.contacts;

export default ContactsSlice.reducer;
