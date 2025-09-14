import { categoriesApi } from 'api/categoriesApi';
import { useFetchRecipes } from 'app/pages/recipes/useFetchRecipes.ts';
import { Layout } from 'components/Layout';
import Loader from 'components/Loader';
import { type Option } from 'components/MultiDropdown';
import Pagination from 'components/Pagination/Pagination.tsx';
import Text from 'components/Text';
import { useFetch } from 'hooks/useFetch.ts';
import { useCallback, useState } from 'react';

import styles from './RecipesPage.module.scss';
import { Description } from './components/Description';
import { Filters } from './components/Filters';
import { IngredientsList } from './components/IngredientsList';

export const RecipesPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);

  const {
    data: categories,
    error: errorCategories,
    loading: loadingCategories,
  } = useFetch(categoriesApi.getCategories);

  const {
    recipes,
    error,
    loading,
    setAppliedSearchTerm,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
  } = useFetchRecipes(selectedCategories);

  const options =
    categories?.data.map((c) => ({
      key: c.id.toString(),
      value: c.title,
    })) || [];

  const getTitle = useCallback(function (value: Option[]) {
    return value.length > 0 ? value.map((v) => v.value).join(', ') : 'Categories';
  }, []);

  const onChangeCategories = (value: Option[]) => {
    setPage(1);
    setSelectedCategories(value);
  };

  const onSearchFilter = () => {
    setPage(1);
    setAppliedSearchTerm(searchTerm);
  };

  if (error || errorCategories) return <Text>{error}</Text>;

  return (
    <Layout>
      <section className={styles.bannerImage}>
        <img src="src/assets/images/banner.webp" alt="banner" />
      </section>
      <div className={styles.content}>
        <Description />
        <Filters
          value={selectedCategories}
          searchTerm={searchTerm}
          setValue={onChangeCategories}
          setSearchTerm={setSearchTerm}
          options={options}
          getTitle={getTitle}
          onClick={onSearchFilter}
        />
        {loading || loadingCategories ? (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        ) : (
          <>
            <IngredientsList recipes={recipes?.data} />
            {!!recipes?.meta.pagination.total && (
              <Pagination page={page} onChange={setPage} total={recipes.meta.pagination.total} />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
