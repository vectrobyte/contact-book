import { type PaginationMeta } from '@/@types';
import { DEFAULT_PAGINATION_META } from '@/lib/configs';
import { type Contact } from '@/server/models';

export type ContactsState = {
  contacts: Contact[];
  pagination: PaginationMeta;
};

export const ContactsState: ContactsState = {
  contacts: [],
  pagination: DEFAULT_PAGINATION_META,
};
