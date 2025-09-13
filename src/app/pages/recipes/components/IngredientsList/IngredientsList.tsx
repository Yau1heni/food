import type { Ingredient, Recipe } from 'api/types.ts';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import AlarmClockIcon from 'components/icons/AlarmClockIcon';
import { routes } from 'config/routes.ts';
import type { FC } from 'react';
import { Link } from 'react-router';

import styles from './IngredientsList.module.scss';

type IngredientsListProps = {
  recipes?: Recipe[];
};

export const IngredientsList: FC<IngredientsListProps> = ({ recipes }) => {
  const getIngredients = (ingredients: Ingredient[]) =>
    ingredients.map(
      ({ name }, index: number) => `${name} ${index + 1 < ingredients.length && '+ '}`
    );

  return (
    <div className={styles.ingredientsList}>
      {recipes && recipes.length > 0 ? (
        recipes.map((el) => (
          <Link key={el.id} to={routes.recipe.create(el.documentId)}>
            <Card
              captionSlot={
                <div className={styles.captionSlot}>
                  <AlarmClockIcon />
                  {`${el.cookingTime} minutes`}
                </div>
              }
              title={el.name}
              subtitle={getIngredients(el.ingradients)}
              image={el.images[0].url}
              actionSlot={
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    weight={'bold'}
                    view={'p-18'}
                    color={'accent'}
                  >{`${el.calories} kcal`}</Text>
                  <Button>Save</Button>
                </div>
              }
            />
          </Link>
        ))
      ) : (
        <Text>Список ингридиентов пуст</Text>
      )}
    </div>
  );
};
