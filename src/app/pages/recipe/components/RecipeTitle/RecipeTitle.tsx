import Text from 'components/Text';
import React from 'react';

import styles from './RecipeTitle.module.scss';

type RecipeTitleProps = {
  title: string;
};

export const RecipeTitle: React.FC<RecipeTitleProps> = ({ title }) => {
  return (
    <Text maxLines={2} weight={'bold'} className={styles.recipeTitle}>
      {title}
    </Text>
  );
};
