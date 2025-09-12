import { ColumnsLayout } from 'components/ColumnsLayout';
import Text from 'components/Text';
import type { JSX } from 'react';

import styles from './List.module.scss';

type ListProps<T> = {
  items: T[];
  title: string;
  render: (item: T) => JSX.Element;
};

export const List = <T,>({ items, render, title }: ListProps<T>) => {
  const renderList = items.map((item, index) => (
    <li key={index} className={styles.listItem}>
      {render(item)}
    </li>
  ));

  return (
    <div className={styles.ingredientsList}>
      <Text view={'p-20'} weight={'bold'}>
        {title}
      </Text>
      <ColumnsLayout>{renderList}</ColumnsLayout>
    </div>
  );
};
