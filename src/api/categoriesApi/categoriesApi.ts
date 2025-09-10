import type { ApiResponse, RecipeCategory } from 'api/types.ts';
import { instance } from 'config/axios-config.ts';

export const categoriesApi = {
  async getCategories() {
    const res = await instance.get<ApiResponse<RecipeCategory>>('/meal-categories');
    return res.data;
  },
};
