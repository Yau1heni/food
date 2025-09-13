import type { ApiResponse, Recipe } from 'api/types.ts';
import { instance } from 'config/axios-config.ts';
import qs from 'qs';

export const recipesApi = {
  async getRecipes(page = 1) {
    const queryString = qs.stringify(
      {
        populate: ['ingradients', 'images', 'category'],
        pagination: { pageSize: 9, page: page },
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
