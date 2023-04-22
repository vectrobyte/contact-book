import { type PaginationMeta } from '@/@types';

export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_PAGINATION_META: PaginationMeta = {
  total: 0,
  total_page: 0,
  current_page: 1,
  current_page_size: 0,
  per_page: DEFAULT_PAGE_SIZE,
};
