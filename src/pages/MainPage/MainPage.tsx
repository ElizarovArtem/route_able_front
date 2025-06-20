import React from 'react';
import { useShallow } from 'zustand/react/shallow';

import { UiButton } from '@/components/ui/UiButton/UiButton.tsx';
import { authSelector } from '@/store/authStore.ts';
import { useStore } from '@/store/useStore.ts';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  const { setIsAuthModalOpen } = useStore(useShallow(authSelector));

  const onStartClick = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Выведи свой тренировочный процесс на новый уровень осознанности
      </h1>
      <UiButton className={styles.button} onClick={onStartClick}>
        Начать
      </UiButton>
    </div>
  );
};
