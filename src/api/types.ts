export type StrapiBase = {
  id: number;
  documentId: string;
};

type MetaApi = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type StrapiImage = StrapiBase & {
  url: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  previewUrl: string;
  provider: string;
};

export type ApiResponse<T> = {
  data: T;
  meta: MetaApi;
};
