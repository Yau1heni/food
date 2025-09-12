import { categoriesApi } from 'api/categoriesApi';
import { recipesApi } from 'api/recipesApi';
import type { ApiResponse, Recipe } from 'api/types.ts';
import type { Option } from 'components/MultiDropdown';
import { useCallback, useEffect, useState } from 'react';

type UseFetchRecipes = {
  recipes: ApiResponse<Recipe[]> | null;
  categories: Option[] | null;
  loading: boolean;
  error: string | null;
};

export const useFetchRecipes = (): UseFetchRecipes => {
  const [recipes, setRecipes] = useState<ApiResponse<Recipe[]> | null>(null);
  const [categories, setCategories] = useState<Option[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async (): Promise<void> => {
    try {
      const categoriesData = await categoriesApi.getCategories();
      setCategories(
        categoriesData.data.map((c) => ({
          key: c.id.toString(),
          value: c.title,
        }))
      );
    } catch (err) {
      setError(
        `Ошибка при загрузке категорий: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }, []);

  // Загрузка рецептов
  const fetchRecipes = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const recipesData = await recipesApi.getRecipes();
      setRecipes(recipesData);
    } catch (err) {
      setError(`Ошибка при загрузке рецептов: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, [fetchCategories, fetchRecipes]);

  return { recipes, categories, loading, error };
};
