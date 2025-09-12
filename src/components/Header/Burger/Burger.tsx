import { Navigation } from 'components/Navigation';
import { useState } from 'react';

import styles from './Burger.module.scss';

export const Burger = () => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button className={styles.menuButton} onClick={onOpen} aria-label="Open menu">
        &#9776;
      </button>
      {open && (
        <div className={styles.overlay}>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close menu">
            &times;
          </button>
          <Navigation className={styles.navLinks} />
        </div>
      )}
    </>
  );
};
