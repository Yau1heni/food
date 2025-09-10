import Text from 'components/Text';
import { Link, useLocation } from 'react-router';

import styles from './Navigation.module.scss';
import { navigationConfig } from './navigation-config.ts';

export const Navigation = () => {
  const { pathname } = useLocation();

  const navList = navigationConfig.map(({ title, to }, i) => (
    <Link className={styles.link} to={to} key={i}>
      <Text color={pathname === to ? 'accent' : 'primary'} view={'p-16'}>
        {title}
      </Text>
    </Link>
  ));

  return <nav className={styles.navigation}>{navList}</nav>;
};
