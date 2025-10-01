import type { ApiResponse } from 'api/types.ts';
import { instance } from 'config/axiosConfig.ts';
import qs from 'qs';
import type { GetRecipesArgs, Recipe } from 'store/models';

type Filters = {
  name: Record<string, string>;
  vegetarian?: Record<string, boolean>;
  category?: {
    id: Record<string, string[]>;
  };
};

export const recipesApi = {
  async getRecipes(data: GetRecipesArgs) {
    const { page = 1, term = '', categories = 'Categories', isVegetarian } = data;

    const filters: Filters = {
      name: {
        $containsi: term,
      },
    };

    if (categories) {
      filters.category = {
        id: {
          $in: categories.split(','),
        },
      };
    }

    if (isVegetarian) {
      filters.vegetarian = {
        $eq: isVegetarian,
      };
    }

    const queryString = qs.stringify(
      {
        populate: ['ingradients', 'images', 'category'],
        pagination: { pageSize: 9, page: page },
        filters: filters,
      },
      { encodeValuesOnly: true }
    );

    // const res = await instance.get<ApiResponse>('/recipes?populate=*');
    const res = await instance.get<ApiResponse<Recipe[]>>(`/recipes?${queryString}`);
    return res.data;
  },

  async getRecipe(id: string) {
    const queryString = qs.stringify(
      { populate: ['ingradients', 'images', 'category', 'equipments', 'directions'] },
      { encodeValuesOnly: true }
    );

    const res = await instance.get<ApiResponse<Recipe>>(`/recipes/${id}?${queryString}`);
    return res.data;
  },
};
