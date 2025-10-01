import type { Direction } from 'api/types.ts';
import Text from 'components/Text';
import React from 'react';

import { DirectionStep } from '../DirectionStep';

import styles from './DirectionsSection.module.scss';

type DirectionsSectionProps = {
  directions: Direction[];
};

export const DirectionsSection: React.FC<DirectionsSectionProps> = ({ directions }) => {
  return (
    <section className={styles.directionsSection}>
      <Text className={styles.title} view={'p-20'} weight={'bold'}>
        Directions
      </Text>
      <ul>
        {directions.map(({ id, description }, index) => (
          <DirectionStep key={id} description={description} step={index + 1} />
        ))}
      </ul>
    </section>
  );
};
