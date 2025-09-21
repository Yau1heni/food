export type PaginationModel = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export const getInitialPaginationModel = (): PaginationModel => ({
  page: 1,
  pageSize: 9,
  pageCount: 0,
  total: 0,
});
