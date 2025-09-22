import { instance } from 'config/axiosConfig.ts';
import type { Favorites } from 'store/models/favorites/favorites.ts';

export const favoritesApi = {
  async getFavorites() {
    const res = await instance.get<Favorites[]>('/favorites');
    return res.data;
  },

  async addFavorite(data: { recipe: number }) {
    const res = await instance.post<Favorites>('/favorites/add', data);
    return res.data;
  },

  async removeFavorite(data: { recipe: number }) {
    const res = await instance.post<{ ok: boolean }>('/favorites/remove', data);
    return res.data;
  },
};
