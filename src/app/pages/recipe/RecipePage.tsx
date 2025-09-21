import { RecipeStats } from 'app/pages/recipe/components/RecipeStats';
import { RecipeTitle } from 'app/pages/recipe/components/RecipeTitle';
import { getStatsData } from 'app/pages/recipe/components/getStatsData.ts';
import { Container } from 'components/Container';
import { Layout } from 'components/Layout';
import Loader from 'components/Loader';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { routes } from 'config/routes.ts';
import { useLocalStore } from 'hooks/useLocalStore.ts';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import RecipesStore from 'store/RecipesStore';
import { Meta } from 'utils/meta.ts';

import styles from './RecipePage.module.scss';
import { DirectionsSection } from './components/DirectionsSection';
import { IngredientsSection } from './components/IngredientsSection';
import { RecipeDescription } from './components/RecipeDescription';
import { RecipeImage } from './components/RecipeImage';

export const RecipePage = observer(() => {
  const { id } = useParams();

  const recipesStore = useLocalStore(() => new RecipesStore());

  useEffect(() => {
    recipesStore.getRecipe(id || '');
  }, [id, recipesStore]);

  if (recipesStore.meta === Meta.loading) {
    return (
      <Layout>
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </Layout>
    );
  }

  if (recipesStore.meta === Meta.error) {
    return (
      <Layout>
        <div className={styles.error}>Error: {recipesStore.errorMessage}</div>
      </Layout>
    );
  }

  if (recipesStore.currentRecipe === null) {
    return null;
  }

  const recipe = recipesStore.currentRecipe;

  return (
    <Layout>
      <div className={styles.recipe}>
        <div className={styles.backgroundImage} />
        <Container className={styles.recipeContainer}>
          <div className={styles.recipeHeader}>
            <Link to={routes.recipes.mask} className={styles.goBack} aria-label={'link go back'}>
              <ArrowRightIcon width={32} height={32} viewBox="0 0 32 32" color={'accent'} />
            </Link>
            <RecipeTitle title={recipe.name} />
          </div>
          <div className={styles.stats}>
            <RecipeImage src={recipe.images[0]?.url || ''} alt={recipe.name} />
            <RecipeStats stats={getStatsData(recipe)} />
          </div>
          <RecipeDescription description={recipe.summary || 'No description available'} />
          <IngredientsSection ingredients={recipe.ingradients} equipments={recipe.equipments} />
          <DirectionsSection directions={recipe.directions} />
        </Container>
      </div>
    </Layout>
  );
});
