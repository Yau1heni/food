import Button from 'components/Button';
import HtmlContent from 'components/HtmlContent';
import Text from 'components/Text';
import { routes } from 'config/routes.ts';
import { observer } from 'mobx-react-lite';
import { type FC, useState } from 'react';
import { Link, useLocation } from 'react-router';
import rootStore from 'store/RootStore';
import type { Recipe } from 'store/models';

import styles from './FavoritesItem.module.scss';

type FavoritesItemProps = {
  item: Recipe;
};

export const FavoritesItem: FC<FavoritesItemProps> = observer(({ item }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { pathname } = useLocation();

  const handleToggleCollapsed = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const onRemove = () => {
    rootStore.favorites.removeFavorite(item.id);
  };

  return (
    <li className={styles.favoritesItem}>
      <div className={styles.itemBody}>
        <div className={styles.image}>
          <img src={item.images[0].formats.thumbnail.url} alt="recipe image" />
        </div>
        <div className={styles.description}>
          <Link
            to={routes.recipe.create(item.documentId)}
            state={{ from: pathname }}
            title={'go to recipe page'}
          >
            <Text maxLines={2} view={'p-20'}>
              {item.name}
            </Text>
          </Link>

          <Text tag={'h3'} maxLines={isCollapsed ? 2 : undefined}>
            <HtmlContent html={item.summary} />
          </Text>
        </div>
      </div>

      <div className={styles.actions}>
        <Button onClick={onRemove}>Remove</Button>
        <Button className={styles.collapsedButton} onClick={handleToggleCollapsed}>
          {isCollapsed ? 'read in full...' : 'collapse description'}
        </Button>
      </div>
    </li>
  );
});
