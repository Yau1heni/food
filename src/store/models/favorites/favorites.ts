import type { StrapiBase } from 'api/types.ts';
import type { Nullable, Recipe } from 'store/models';

export type Favorites = StrapiBase & {
  createdAt: string;
  updatedAt: string;
  publishedAt: Nullable<string>;
  locale: null;
  originalRecipeId: number;
  recipe: Recipe;
};
