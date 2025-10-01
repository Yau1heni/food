import AlarmClockIcon from 'components/icons/AlarmClockIcon';
import type { FC } from 'react';

import styles from './IngredientsCardCaption.module.scss';

type IngredientsCardCaptionProps = {
  cookingTime: number;
};

export const IngredientsCardCaption: FC<IngredientsCardCaptionProps> = ({ cookingTime }) => {
  return (
    <div className={styles.captionSlot}>
      <AlarmClockIcon />
      {`${cookingTime} minutes`}
    </div>
  );
};

export default IngredientsCardCaption;
