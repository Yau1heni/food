import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown, { type Option } from 'components/MultiDropdown';
import SearchIcon from 'components/icons/SearchIcon';
import { type FC } from 'react';

import styles from './Filters.module.scss';

type FiltersProps = {
  options: Option[];
  value: Option[];
  setValue: (value: Option[]) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  getTitle: (value: Option[]) => string;
  onClick: () => void;
};

export const Filters: FC<FiltersProps> = (props) => {
  const { options, value, setValue, searchTerm, setSearchTerm, getTitle, onClick } = props;

  return (
    <div>
      <div className={styles.search}>
        <Input value={searchTerm} onChange={setSearchTerm} />
        <Button onClick={onClick}>
          <SearchIcon />
        </Button>
      </div>
      <MultiDropdown
        className={styles.dropdown}
        options={options}
        value={value}
        onChange={setValue}
        getTitle={getTitle}
      />
    </div>
  );
};
