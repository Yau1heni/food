import type { Equipments, Ingredient } from 'api/types.ts';
import { EquipmentItem } from 'app/pages/recipe/components/EquipmentItem';
import { IngredientItem } from 'app/pages/recipe/components/IngredientItem';
import { List } from 'components/List';
import { type FC } from 'react';

import styles from './IngredientsSection.module.scss';

type IngredientsSectionProps = {
  ingredients: Ingredient[];
  equipments: Equipments[];
};

export const IngredientsSection: FC<IngredientsSectionProps> = ({ ingredients, equipments }) => {
  const renderIngredients = ingredients.map((ingredient) => (
    <IngredientItem
      key={ingredient.id}
      name={ingredient.name}
      amount={ingredient.amount}
      unit={ingredient.unit}
    />
  ));

  const renderEquipment = equipments.map(({ name, id }) => <EquipmentItem key={id} name={name} />);

  return (
    <section className={styles.ingredientsSection}>
      <List title={'Ingredients'}>{renderIngredients}</List>
      <div className={styles.line} />
      <List title={'Equipment'}>{renderEquipment}</List>
    </section>
  );
};
