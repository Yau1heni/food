import Text from 'components/Text';
import type { FC } from 'react';
import type { Favorites } from 'store/models';

import { FavoritesItem } from '../FavoritesItem/FavoritesItem.tsx';

import styles from './FavoritesList.module.scss';

type FavoritesListProps = {
  favorites: Favorites[];
};

export const FavoritesList: FC<FavoritesListProps> = (props) => {
  const { favorites } = props;

  if (favorites.length === 0) {
    return <Text>Нет избранных рецептов</Text>;
  }

  return (
    <ul className={styles.favoritesList}>
      {favorites.map((el) => (
        <FavoritesItem key={el.id} item={el.recipe} />
      ))}
    </ul>
  );
};
