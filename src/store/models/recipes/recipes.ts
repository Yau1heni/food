import type { StrapiBase, StrapiImage } from 'api/types.ts';
import type { CategoryApi } from 'store/models';

import type { Direction } from './directions.ts';
import type { Equipments } from './equipments.ts';
import type { Ingredient } from './ingradients.ts';

export type Recipe = StrapiBase & {
  name: string;
  totalTime: number;
  cookingTime: number;
  preparationTime: number;
  servings: number;
  likes: number;
  calories: number;
  rating: number;
  summary: string;
  vegetarian: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // при добавлении соответствующих query params
  images: StrapiImage[];
  ingradients: Ingredient[];
  category: CategoryApi[];
  equipments: Equipments[];
  directions: Direction[];
};

export type GetRecipesArgs = {
  page: number;
  term: string;
  categories: string;
  isVegetarian?: boolean;
};
