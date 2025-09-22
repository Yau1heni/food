import Button from 'components/Button';
import Text from 'components/Text';
import type { FC, ReactNode, MouseEvent } from 'react';

import styles from './IngredientsCardAction.module.scss';

type IngredientsCardActionProps = {
  calories: number;
  onClick: () => void;
  isFavorite?: boolean;
  action?: ReactNode;
};

export const IngredientsCardAction: FC<IngredientsCardActionProps> = (props) => {
  const { calories, action, onClick, isFavorite = false } = props;

  const handleAddRecipe = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <div className={styles.actionRow}>
      <Text weight={'bold'} view={'p-18'} color={'accent'}>{`${calories} kcal`}</Text>
      {action ?? (
        <Button disabled={isFavorite} onClick={handleAddRecipe}>
          Save
        </Button>
      )}
    </div>
  );
};

export default IngredientsCardAction;
