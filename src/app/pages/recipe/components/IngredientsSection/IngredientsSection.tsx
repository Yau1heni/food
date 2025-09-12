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
  const renderIngredients = (ingredient: Ingredient) => {
    return (
      <IngredientItem
        key={ingredient.id}
        name={ingredient.name}
        amount={ingredient.amount}
        unit={ingredient.unit}
      />
    );
  };

  const renderEquipment = (equipment: Equipments) => {
    return <EquipmentItem key={equipment.id} name={equipment.name} />;
  };

  return (
    <div className={styles.ingredientsSection}>
      <List title={'Ingredients'} render={renderIngredients} items={ingredients} />
      <div className={styles.line} />
      <List title={'Equipment'} render={renderEquipment} items={equipments} />
    </div>
  );
};
