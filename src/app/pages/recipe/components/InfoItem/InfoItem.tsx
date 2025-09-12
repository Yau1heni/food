import Text from 'components/Text';
import React from 'react';

import styles from './InfoItem.module.scss';

type InfoItemProps = {
  label: string;
  value: string | number;
};

export const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className={styles.infoItem}>
      <Text>{label}</Text>
      <Text color={'accent'}>{value}</Text>
    </div>
  );
};
