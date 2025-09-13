import { Filters } from 'app/pages/recipes/components/Filters/Filters.tsx';
import { useFetchRecipes } from 'app/pages/recipes/useFetchRecipes.ts';
import { Layout } from 'components/Layout';
import Loader from 'components/Loader';
import { type Option } from 'components/MultiDropdown';
import Pagination from 'components/Pagination/Pagination.tsx';
import Text from 'components/Text';
import { useCallback, useState } from 'react';

import styles from './RecipesPage.module.scss';
import { Description } from './components/Description';
import { IngredientsList } from './components/IngredientsList';

export const RecipesPage = () => {
  const [value, setValue] = useState<Option[]>([]);
  const [term, setTerm] = useState('');
  const [page, setPage] = useState(1);

  const getTitle = useCallback(function (value: Option[]) {
    return value.length > 0 ? value.map((v) => v.value).join(', ') : 'Categories';
  }, []);

  const { recipes, categories, loading, error } = useFetchRecipes(page);

  if (error) return <Text>{error}</Text>;

  return (
    <Layout>
      <section className={styles.bannerImage}>
        <img src="src/assets/images/banner.webp" alt="banner" />
      </section>
      <div className={styles.content}>
        <Description />
        <Filters
          value={value}
          term={term}
          setValue={setValue}
          setTerm={setTerm}
          categories={categories}
          getTitle={getTitle}
        />
        {loading ? (
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
