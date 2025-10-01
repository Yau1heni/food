import { recipesApi } from 'api/recipesApi';
import type { ApiResponse, Recipe } from 'api/types.ts';
import type { Option } from 'components/MultiDropdown';
import { useFetch } from 'hooks/useFetch.ts';
import { useCallback, useState } from 'react';

type UseFetchRecipes = {
  recipes: ApiResponse<Recipe[]> | null;
  loading: boolean;
  error: string | null;
  setAppliedSearchTerm: (appliedSearchTerm: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  page: number;
  setPage: (page: number) => void;
};

export const useFetchRecipes = (value: Option[]): UseFetchRecipes => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const getCategoryKeys = useCallback(function (value: Option[]) {
    return value.length > 0 ? value.map((v) => v.key).join(', ') : '';
  }, []);

  const {
    data: recipes,
    error,
    loading,
  } = useFetch(recipesApi.getRecipes, page, appliedSearchTerm, getCategoryKeys(value));

  return {
    recipes,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    setAppliedSearchTerm,
  };
};
