import { recipesApi } from 'api/recipesApi';
import { RecipeStats } from 'app/pages/recipe/components/RecipeStats';
import { RecipeTitle } from 'app/pages/recipe/components/RecipeTitle';
import { getStatsData } from 'app/pages/recipe/components/getStatsData.ts';
import { Container } from 'components/Container';
import { Layout } from 'components/Layout';
import Loader from 'components/Loader';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { routes } from 'config/routes.ts';
import { useFetch } from 'hooks/useFetch.ts';
import { Link, useParams } from 'react-router';

import styles from './RecipePage.module.scss';
import { DirectionsSection } from './components/DirectionsSection';
import { IngredientsSection } from './components/IngredientsSection';
import { RecipeDescription } from './components/RecipeDescription';
import { RecipeImage } from './components/RecipeImage';

export const RecipePage = () => {
  const { id } = useParams();

  const { data: recipe, loading, error } = useFetch(recipesApi.getRecipe, id || '');

  if (loading) {
    return (
      <Layout>
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.error}>Error: {error}</div>
      </Layout>
    );
  }

  if (!recipe?.data) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.recipe}>
        <div className={styles.backgroundImage} />
        <Container className={styles.recipeContainer}>
          <div className={styles.recipeHeader}>
            <Link to={routes.recipes.mask} className={styles.goBack} aria-label={'link go back'}>
              <ArrowRightIcon width={32} height={32} viewBox="0 0 32 32" color={'accent'} />
            </Link>
            <RecipeTitle title={recipe.data.name} />
          </div>
          <div className={styles.stats}>
            <RecipeImage src={recipe.data.images[0]?.url || ''} alt={recipe.data.name} />
            <RecipeStats stats={getStatsData(recipe.data)} />
          </div>
          <RecipeDescription description={recipe.data.summary || 'No description available'} />
          <IngredientsSection
            ingredients={recipe.data.ingradients}
            equipments={recipe.data.equipments}
          />
          <DirectionsSection directions={recipe.data.directions} />
        </Container>
      </div>
    </Layout>
  );
};
