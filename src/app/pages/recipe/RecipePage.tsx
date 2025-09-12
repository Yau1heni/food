import { recipesApi } from 'api/recipesApi';
import { RecipeStats } from 'app/pages/recipe/components/RecipeStats';
import { RecipeTitle } from 'app/pages/recipe/components/RecipeTitle';
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
        <div className={styles.recipeHeader}>
          <Link to={routes.recipes.mask} className={styles.goBack} aria-label={'link go back'}>
            <ArrowRightIcon />
          </Link>
          <RecipeTitle title={recipe.data.name} />
        </div>
        <div className={styles.recipeStats}>
          <RecipeImage src={recipe.data.images[0]?.url || ''} alt={recipe.data.name} />
          <RecipeStats
            preparation={`${recipe.data.preparationTime} minutes`}
            cooking={`${recipe.data.cookingTime} minutes`}
            servings={recipe.data.servings}
            likes={recipe.data.likes}
            ratings={`${recipe.data.rating} / 5`}
            total={recipe.data.totalTime}
          />
        </div>
        <RecipeDescription description={recipe.data.summary || 'No description available'} />
        <IngredientsSection
          ingredients={recipe.data.ingradients}
          equipments={recipe.data.equipments}
        />
        <DirectionsSection directions={recipe.data.directions} />
      </div>
    </Layout>
  );
};
