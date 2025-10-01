import { categoriesApi } from 'api/categoriesApi';
import { useFetchRecipes } from 'app/pages/recipes/useFetchRecipes.ts';
import banner from 'assets/images/banner.webp';
import { Container } from 'components/Container';
import { Layout } from 'components/Layout';
import { type Option } from 'components/MultiDropdown';
import Pagination from 'components/Pagination/Pagination.tsx';
import Text from 'components/Text';
import { useFetch } from 'hooks/useFetch.ts';
import { useState } from 'react';

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
  if (error || errorCategories) return <Text>{error}</Text>;

  return (
    <Layout>
      <section className={styles.bannerImage}>
        <img src={banner} alt="banner" />
      </section>

      <Container>
        <section className={styles.content}>
          <Description />
          <Filters
            value={selectedCategories}
            searchTerm={searchTerm}
            setValue={setSelectedCategories}
            setSearchTerm={setSearchTerm}
            setAppliedSearchTerm={setAppliedSearchTerm}
            categories={categories}
            setPage={setPage}
          />
          {
            <>
              <IngredientsList loading={loading || loadingCategories} recipes={recipes?.data} />
              {recipes?.meta.pagination.total !== 0 && (
                <Pagination page={page} onChange={setPage} total={recipes?.meta.pagination.total} />
              )}
            </>
          }
        </section>
      </Container>
    </Layout>
  );
};
