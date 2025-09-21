import type { ApiResponse } from 'api/types.ts';
import { instance } from 'config/axiosConfig.ts';
import type { CategoryApi } from 'store/models';

export const categoriesApi = {
  async getCategories() {
    const res = await instance.get<ApiResponse<CategoryApi[]>>('/meal-categories');
    return res.data;
  },
};
