import type { ApiResponse, RecipeCategory } from 'api/types.ts';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown, { type Option } from 'components/MultiDropdown';
import SearchIcon from 'components/icons/SearchIcon';
import { type FC, useCallback } from 'react';

import styles from './Filters.module.scss';

type FiltersProps = {
  categories: ApiResponse<RecipeCategory[]> | null;
  value: Option[];
  setValue: (value: Option[]) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  setAppliedSearchTerm: (searchTerm: string) => void;
  setPage: (page: number) => void;
};

export const Filters: FC<FiltersProps> = (props) => {
  const { categories, value, setValue, searchTerm, setSearchTerm, setAppliedSearchTerm, setPage } =
    props;

  const getTitle = useCallback(function (value: Option[]) {
    return value.length > 0 ? value.map((v) => v.value).join(', ') : 'Categories';
  }, []);

  if (categories === null) return null;

  const options = categories.data.map((c) => ({
    key: c.id.toString(),
    value: c.title,
  }));

  const onChangeCategories = (value: Option[]) => {
    setPage(1);
    setValue(value);
  };

  const onSearchFilter = () => {
    setPage(1);
    setAppliedSearchTerm(searchTerm);
  };

  return (
    <div>
      <div className={styles.search}>
        <Input value={searchTerm} onChange={setSearchTerm} />
        <Button onClick={onSearchFilter}>
          <SearchIcon />
        </Button>
      </div>
      <MultiDropdown
        className={styles.dropdown}
        options={options}
        value={value}
        onChange={onChangeCategories}
        getTitle={getTitle}
      />
    </div>
  );
};
