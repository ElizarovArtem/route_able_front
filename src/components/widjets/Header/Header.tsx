import React from 'react';

import { UiButton } from '@/components/ui/UiButton/UiButton.tsx';
import { useStore } from '@/store/useStore.ts';

import styles from './Header.module.scss';

export const Header = () => {
  const user = useStore((state) => state.user);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>Route•able</div>
      <div className={styles.menu}>
        {user ? user.phone : <UiButton>Войти</UiButton>}
      </div>
    </div>
  );
};
