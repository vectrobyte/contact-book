import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type PaginatedResult, type PaginationMeta } from '@/@types';
import { DEFAULT_PAGINATION_META } from '@/lib/configs';
import { type RootState } from '@/lib/providers/StoreProvider';
import { type Contact, type ContactWithGroups } from '@/server/models';

type ContactsState = {
  contacts: ContactWithGroups[];
  pagination: PaginationMeta;
};

export const initialState: ContactsState = {
  contacts: [],
  pagination: DEFAULT_PAGINATION_META,
};

const ContactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setPaginatedContacts(state, action: PayloadAction<PaginatedResult<ContactWithGroups>>) {
      state.contacts = action.payload.data;
      state.pagination = action.payload.meta;
    },
    add(state, action: PayloadAction<ContactWithGroups>) {
      state.contacts.unshift(action.payload);
      state.pagination.total += 1;
      state.pagination.per_page += 1;
    },
    update(state, action: PayloadAction<Contact>) {
      const index = state.contacts.findIndex((contact) => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = {
          ...state.contacts[index],
          ...action.payload,
        };
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
