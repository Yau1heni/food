import type { StrapiBase } from 'api/types.ts';
import type { Option } from 'components/MultiDropdown';

export type CategoryApi = StrapiBase & {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type CategoryModel = {
  key: string;
  value: string;
};

export const normalizeCategory = (from: CategoryApi): CategoryModel => ({
  key: String(from.id),
  value: from.title,
});

export const getCategoryKeys = (value: Option[]) => {
  return value.length > 0 ? value.map((v) => v.key).join(', ') : '';
};
