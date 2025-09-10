import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown, { type Option } from 'components/MultiDropdown';
import SearchIcon from 'components/icons/SearchIcon';
import { type FC } from 'react';

import styles from './Filters.module.scss';

type FiltersProps = {
  categories: Option[] | null;
  value: Option[];
  setValue: (value: Option[]) => void;
  term: string;
  setTerm: (term: string) => void;
  getTitle: (value: Option[]) => string;
};

export const Filters: FC<FiltersProps> = (props) => {
  const { categories, value, setValue, term, setTerm, getTitle } = props;

  return (
    <div>
      <div className={styles.search}>
        <Input value={term} onChange={setTerm} />
        <Button>
          <SearchIcon />
        </Button>
      </div>
      <MultiDropdown
        className={styles.dropdown}
        options={categories || []}
        value={value}
        onChange={setValue}
        getTitle={getTitle}
      />
    </div>
  );
};
