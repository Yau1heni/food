import React, { type PropsWithChildren } from 'react';

import styles from './ColumnsLayout.module.scss';

export const ColumnsLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <ul className={styles.columnsLayout}>{children}</ul>;
};
