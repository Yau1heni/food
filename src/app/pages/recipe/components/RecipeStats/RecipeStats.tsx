import React from 'react';
import { plural } from 'utils/plural.ts';

import { InfoItem } from '../InfoItem';

import styles from './RecipeStats.module.scss';

type RecipeStatsProps = {
  preparation: string;
  cooking: string;
  total: number;
  servings: number;
  likes: number;
  ratings: string;
};

export const RecipeStats: React.FC<RecipeStatsProps> = (props) => {
  const { preparation, likes, ratings, servings, total, cooking } = props;

  const pluralServing = plural(servings, {
    one: 'serving',
    other: 'servings',
  });

  return (
    <div className={styles.recipeStats}>
      <InfoItem label="Preparation" value={preparation} />
      <InfoItem label="Cooking" value={cooking} />
      <InfoItem label="Total" value={total} />
      <InfoItem label="Likes" value={likes} />
      <InfoItem label="Servings" value={`${servings} ${pluralServing}`} />
      <InfoItem label="Ratings" value={ratings} />
    </div>
  );
};
