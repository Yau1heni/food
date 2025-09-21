import Card from 'components/Card';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { routes } from 'config/routes.ts';
import type { FC } from 'react';
import { Link } from 'react-router';
import type { Ingredient, Recipe } from 'store/models';

import IngredientsCardAction from './IngredientsCardAction';
import IngredientsCardCaption from './IngredientsCardCaption';
import styles from './IngredientsList.module.scss';

type IngredientsListProps = {
  recipes?: Recipe[];
  loading: boolean;
};

export const IngredientsList: FC<IngredientsListProps> = ({ recipes, loading }) => {
  const getIngredients = (ingredients: Ingredient[]) =>
    ingredients.map(({ name }) => name).join(' + ');

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (recipes === undefined) return null;

  if (recipes.length === 0) {
    return <Text>Список ингридиентов пуст</Text>;
  }

  return (
    <ul className={styles.ingredientsList}>
      {recipes.map((el) => (
        <Link key={el.id} to={routes.recipe.create(el.documentId)} className={styles.cardLink}>
          <Card
            captionSlot={<IngredientsCardCaption cookingTime={el.cookingTime} />}
            title={el.name}
            subtitle={getIngredients(el.ingradients)}
            image={el.images[0].url}
            actionSlot={<IngredientsCardAction calories={el.calories} />}
          />
        </Link>
      ))}
    </ul>
  );
};
