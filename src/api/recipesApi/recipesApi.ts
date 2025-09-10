import type { ApiResponse, Recipe } from 'api/types.ts';
import { instance } from 'config/axios-config.ts';
import qs from 'qs';

export const recipesApi = {
  async getRecipes() {
    const queryString = qs.stringify(
      { populate: ['ingradients', 'images', 'category'] },
      { encodeValuesOnly: true }
    );

    // const res = await instance.get<ApiResponse>('/recipes?populate=*');
    const res = await instance.get<ApiResponse<Recipe>>(`/recipes?${queryString}`);
    return res.data;
  },
};
