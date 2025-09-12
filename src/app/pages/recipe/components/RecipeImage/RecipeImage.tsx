import React from 'react';

import styles from './RecipeImage.module.scss';

type RecipeImageProps = {
  src: string;
  alt: string;
};

export const RecipeImage: React.FC<RecipeImageProps> = ({ src, alt }) => {
  return (
    <div className={styles.recipeImage}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};
