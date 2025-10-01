import Button from 'components/Button';
import Text from 'components/Text';
import type { FC, ReactNode } from 'react';

import styles from './IngredientsCardAction.module.scss';

type IngredientsCardActionProps = {
  calories: number;
  action?: ReactNode;
};

export const IngredientsCardAction: FC<IngredientsCardActionProps> = ({ calories, action }) => {
  return (
    <div className={styles.actionRow}>
      <Text weight={'bold'} view={'p-18'} color={'accent'}>{`${calories} kcal`}</Text>
      {action ?? <Button>Save</Button>}
    </div>
  );
};

export default IngredientsCardAction;
