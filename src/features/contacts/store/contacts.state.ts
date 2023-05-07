import { type PaginationMeta } from '@/@types';
import { DEFAULT_PAGINATION_META } from '@/lib/configs';
import { type ContactWithGroups } from '@/server/models';

type ContactsState = {
  contacts: ContactWithGroups[];
  pagination: PaginationMeta;
};

export const initialState: ContactsState = {
  contacts: [],
  pagination: DEFAULT_PAGINATION_META,
};
