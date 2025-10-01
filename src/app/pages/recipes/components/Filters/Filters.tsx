import Button from 'components/Button';
import CheckBox from 'components/CheckBox';
import Input from 'components/Input';
import MultiDropdown, { type Option } from 'components/MultiDropdown';
import Text from 'components/Text';
import SearchIcon from 'components/icons/SearchIcon';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import rootStore from 'store/RootStore';
import { type CategoryModel, type Nullable } from 'store/models';

import styles from './Filters.module.scss';

type FiltersProps = {
  categories: Nullable<CategoryModel[]>;
};

export const Filters: FC<FiltersProps> = observer(({ categories }) => {
  const [localQuery, setLocalQuery] = useState('');
  const isInitialized = useRef(false);

  useEffect(() => {
    const dispose = reaction(
      () => rootStore.query.getParam('searchTerm'),
      (searchString) => {
        if (!isInitialized.current && searchString) {
          setLocalQuery(searchString as string);
          isInitialized.current = true;
          dispose(); // Останавливаем реакцию после инициализации
        }
      },
      { fireImmediately: true }
    );

    return () => dispose();
  }, []);

  const getTitle = useCallback(function (value: Option[]) {
    return value.length > 0 ? value.map((v) => v.value).join(', ') : 'Categories';
  }, []);

  if (categories === null) return null;

  const onChangeCategories = (value: Option[]) => {
    rootStore.query.category = value;
  };

  const onSearchFilter = () => {
    rootStore.query.searchTerm = localQuery;
  };

  const onChangeVegetarian = (isVegetarian: boolean) => {
    rootStore.query.vegetarian = isVegetarian;
  };

  return (
    <div className={styles.filters}>
      <div className={styles.search}>
        <Input value={localQuery} onChange={setLocalQuery} id={'search'} />
        <Button onClick={onSearchFilter}>
          <SearchIcon />
        </Button>
      </div>
      <div className={styles.filtersContainer}>
        <div className={styles.leftGroup}>
          <MultiDropdown
            className={styles.dropdown}
            options={categories}
            value={rootStore.query.category}
            onChange={onChangeCategories}
            getTitle={getTitle}
          />
          <div className={styles.vegetarian}>
            <Text>Vegetarian:</Text>
            <CheckBox checked={rootStore.query.vegetarian} onChange={onChangeVegetarian} />
          </div>
        </div>
        <div>
          <Button onClick={rootStore.query.reset}>Reset filters</Button>
        </div>
      </div>
    </div>
  );
});
