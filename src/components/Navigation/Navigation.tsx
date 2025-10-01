import cn from 'classnames';
import Text from 'components/Text';
import { type FC } from 'react';
import { Link, useLocation } from 'react-router';

import styles from './Navigation.module.scss';
import { navigationConfig } from './navigationConfig.ts';

export type NavigationProps = {
  className?: string;
};

export const Navigation: FC<NavigationProps> = ({ className }) => {
  const { pathname, search } = useLocation();

  const finallyClassName = cn(styles.navigation, className);

  const navList = navigationConfig.map(({ title, to }, i) => (
    <Link to={to} key={i} state={{ from: pathname + search }}>
      <Text color={pathname === to ? 'accent' : 'primary'} view={'p-16'}>
        {title}
      </Text>
    </Link>
  ));

  return <nav className={finallyClassName}>{navList}</nav>;
};
