import cn from 'classnames';
import Text from 'components/Text';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import type { FC } from 'react';

import styles from './Pagination.module.scss';
import { usePagination } from './usePagination.ts';

type PaginationProps = {
  /** Общее количество элементов */
  total?: number;
  /** Текущая страница */
  page?: number;
  /** Callback, вызываемый при взаимодействии с элементами пагинации */
  onChange?: (value: number) => void;
};

const Pagination: FC<PaginationProps> = ({ total = 0, page = 1, onChange }) => {
  const pages = usePagination({ total, page });

  const handlePrev = () => {
    if (page > 1) onChange?.(page - 1);
  };

  const handleNext = () => {
    if (page < pages.length - 1) onChange?.(page + 1);
  };

  const onItemClick = (page: number | string) => typeof page === 'number' && onChange?.(page);

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={cn(styles.arrowButton, page === 1 && styles.disabled)}
      >
        <ArrowRightIcon
          width={32}
          widths={32}
          viewBox={'0 0 32 32'}
          color={page === 1 ? 'secondary' : 'primary'}
        />
      </button>

      <div>
        {pages.map((p, index) => (
          <button
            key={index}
            disabled={p === '...'}
            onClick={() => onItemClick(p)}
            className={cn(
              styles.pageButton,
              page === p && styles.active,
              p === '...' && styles.dots
            )}
          >
            <Text view={'p-18'}>{p}</Text>
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={page >= pages.length - 1}
        className={cn(styles.arrowButton, page === total && styles.disabled)}
      >
        <ArrowLeftIcon
          width={32}
          widths={32}
          viewBox={'0 0 32 32'}
          color={page >= pages.length - 1 ? 'secondary' : 'primary'}
        />
      </button>
    </div>
  );
};

export default Pagination;
