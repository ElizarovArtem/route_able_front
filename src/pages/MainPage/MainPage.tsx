import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { UiButton } from '@/components/ui/UiButton/UiButton.tsx';
import { useSelector } from '@/hooks/useSelector.ts';
import { authSelector } from '@/store/authStore.ts';
import { userSelector } from '@/store/usersStore.ts';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  const navigation = useNavigate();
  const { setIsAuthModalOpen } = useSelector(authSelector);
  const { user } = useSelector(userSelector);

  const onStartClick = () => {
    if (user) {
      navigation({ to: '/menu' });
    } else {
      setIsAuthModalOpen(true);
    }
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
