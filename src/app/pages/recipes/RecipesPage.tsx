import { Filters } from 'app/pages/recipes/components/Filters';
import banner from 'assets/images/banner.webp';
import { Container } from 'components/Container';
import { Layout } from 'components/Layout';
import Pagination from 'components/Pagination';
import Text from 'components/Text';
import { useLocalStore } from 'hooks/useLocalStore.ts';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import CategoriesStore from 'store/CategoriesStore';
import RecipesStore from 'store/RecipesStore';
import rootStore from 'store/RootStore';
import { PAGINATION_LIMIT } from 'store/models';
import { Meta } from 'utils/meta.ts';

import styles from './RecipesPage.module.scss';
import { Description } from './components/Description';
import { IngredientsList } from './components/IngredientsList';

export const RecipesPage = observer(() => {
  const categoriesStore = useLocalStore(() => new CategoriesStore());
  const recipesStore = useLocalStore(() => new RecipesStore());

  useEffect(() => {
    categoriesStore.getCategories();
  }, [categoriesStore]);

  if (recipesStore.errorMessage) return <Text>{recipesStore.errorMessage}</Text>;

  return (
    <Layout>
      <section className={styles.bannerImage}>
        <img src={banner} alt="banner" />
      </section>
      <Container>
        <section className={styles.content}>
          <Description />
          <Filters categories={categoriesStore.list} />
          <IngredientsList
            loading={
              recipesStore.meta === Meta.loading || rootStore.favorites.meta === Meta.loading
            }
            recipes={recipesStore.list}
          />
          {recipesStore.meta === Meta.success &&
            recipesStore.pagination.total > PAGINATION_LIMIT && (
              <Pagination
                page={recipesStore.pagination.page}
                onChange={recipesStore.setPage}
                total={recipesStore.pagination.total}
              />
            )}
        </section>
      </Container>
    </Layout>
  );
});
