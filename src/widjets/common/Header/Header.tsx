import { useStore } from '@tanstack/react-store';
import React from 'react';

import { Button } from '@/components/ui/Button/Button.tsx';
import { usersStore } from '@/store/usersStore.ts';

import styles from './Header.module.scss';

export const Header = () => {
  const { user } = useStore(usersStore);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>Route•able</div>
      <div className={styles.menu}>
        {user ? user.name : <Button>Войти</Button>}
      </div>
    </div>
  );
};
