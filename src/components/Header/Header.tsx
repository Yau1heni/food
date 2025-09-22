import { Container } from 'components/Container/Container.tsx';
import { HeaderModal } from 'components/Header/HeaderModal/HeaderModal.tsx';
import { Navigation } from 'components/Navigation';
import Text from 'components/Text';
import LikeIcon from 'components/icons/LikeIcon';
import LogoIcon from 'components/icons/LogoIcon';
import UserIcon from 'components/icons/UserIcon';
import { routes } from 'config/routes.ts';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

import { Burger } from './Burger/Burger.tsx';
import styles from './Header.module.scss';

export const Header = () => {
  const { pathname, search } = useLocation();
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <Burger onOpen={onOpen} />
          <HeaderModal open={open} onClose={onClose} />
          <div className={styles.navGroup}>
            <Link
              to={routes.main.mask}
              state={{ from: pathname + search }}
              className={styles.logo}
              aria-label={'Food Client logo'}
            >
              <LogoIcon />
              <Text tag={'h1'} view={'p-20'} weight={'bold'}>
                Food Client
              </Text>
            </Link>
            <Navigation />
          </div>
          <div className={styles.controls}>
            <LikeIcon />
            <UserIcon />
          </div>
        </div>
      </Container>
    </header>
  );
};
