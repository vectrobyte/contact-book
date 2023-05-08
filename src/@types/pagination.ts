export type PaginationMeta = {
  total: number;
  total_page: number;
  current_page: number;
  per_page: number;
  current_page_size: number;
};

export type PageParams = Partial<{
  page: number;
  size: number;
  keyword?: string;
  group_id?: string;
}>;

export type PaginatedResult<T> = {
  data: T[];
  meta: PaginationMeta;
};
