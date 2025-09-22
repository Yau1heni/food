import Card from 'components/Card';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { routes } from 'config/routes.ts';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import { Link, useLocation } from 'react-router';
import rootStore from 'store/RootStore';
import type { Ingredient, Recipe } from 'store/models';

import IngredientsCardAction from './IngredientsCardAction';
import IngredientsCardCaption from './IngredientsCardCaption';
import styles from './IngredientsList.module.scss';

type IngredientsListProps = {
  recipes?: Recipe[];
  loading: boolean;
};

export const IngredientsList: FC<IngredientsListProps> = observer(({ recipes, loading }) => {
  const { pathname, search } = useLocation();

  const getIngredients = (ingredients: Ingredient[]) =>
    ingredients.map(({ name }) => name).join(' + ');

  const addRecipe = (id: number) => {
    rootStore.favorites.addFavorite(id);
  };

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
        <Link
          key={el.id}
          to={routes.recipe.create(el.documentId)}
          state={{ from: pathname + search }}
          className={styles.cardLink}
        >
          <Card
            captionSlot={
              <IngredientsCardCaption
                cookingTime={el.cookingTime}
                isFavorite={rootStore.favorites.checkAvailability(el.id)}
              />
            }
            title={el.name}
            subtitle={getIngredients(el.ingradients)}
            image={el.images[0].url}
            actionSlot={
              <IngredientsCardAction
                onClick={() => addRecipe(el.id)}
                calories={el.calories}
                isFavorite={rootStore.favorites.checkAvailability(el.id)}
              />
            }
          />
        </Link>
      ))}
    </ul>
  );
});
