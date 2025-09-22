import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { routes } from 'config/routes.ts';
import React from 'react';
import { Link, useLocation } from 'react-router';

import styles from './PageTitle.module.scss';

type RecipeTitleProps = {
  title: string;
  to?: string;
};

export const PageTitle: React.FC<RecipeTitleProps> = ({ title, to = routes.main.mask }) => {
  const location = useLocation();
  const from = location.state?.from || to;

  return (
    <div className={styles.pageTitle}>
      <Link to={from} className={styles.goBack} aria-label={'link go back'}>
        <ArrowRightIcon width={32} height={32} viewBox="0 0 32 32" color={'accent'} />
      </Link>
      <Text maxLines={2} weight={'bold'} className={styles.title}>
        {title}
      </Text>
    </div>
  );
};
