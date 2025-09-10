import { Navigation } from 'components/Navigation';
import Text from 'components/Text';
import LikeIcon from 'components/icons/LikeIcon';
import LogoIcon from 'components/icons/LogoIcon';
import UserIcon from 'components/icons/UserIcon';
import { routes } from 'config/routes.ts';
import { Link } from 'react-router';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.navGroup}>
        <Link to={routes.recipes.mask} className={styles.logo}>
          <LogoIcon />
          <Text tag={'h1'} view={'p-20'} weight={'bold'}>
            Food Client
          </Text>
        </Link>
        <Navigation />
      </div>
      <div className={styles.controls}>
        <LikeIcon />
        <UserIcon />
      </div>
    </header>
  );
};
