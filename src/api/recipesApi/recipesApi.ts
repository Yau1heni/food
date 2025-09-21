import type { ApiResponse } from 'api/types.ts';
import { instance } from 'config/axiosConfig.ts';
import qs from 'qs';
import type { Recipe } from 'store/models';

type Filters = {
  name: Record<string, string>;
  category?: {
    id: Record<string, string[]>;
  };
};

export const recipesApi = {
  async getRecipes(page = 1, term = '', category = 'Categories') {
    const filters: Filters = {
      name: {
        $containsi: term,
      },
    };

    if (category) {
      filters.category = {
        id: {
          $in: category.split(','),
        },
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
