import HtmlContent from 'components/HtmlContent';
import React from 'react';

import styles from './RecipeDescription.module.scss';

type RecipeDescriptionProps = {
  description: string;
};

export const RecipeDescription: React.FC<RecipeDescriptionProps> = ({ description }) => {
  return (
    <div className={styles.recipeDescription}>
      <HtmlContent html={description} />
    </div>
  );
};
