import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { CoachesList } from '@/c.widgets/user';
import { authSelector } from '@/d.features/user';
import { userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { UiButton } from '@/f.shared/ui';

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

  const onLkLinkClick = () => {
    navigation({ to: '/lk' });
  };

  return (
    <div className={styles.page}>
      {!user && (
        <>
          <h1 className={styles.title}>
            Выведи свой тренировочный процесс на новый уровень осознанности
          </h1>
          <UiButton className={styles.button} onClick={onStartClick}>
            Начать
          </UiButton>
        </>
      )}
      {user && (
        <>
          <div className={styles.menuButtons}>
            <UiButton onClick={onLkLinkClick}>Личный кабинет</UiButton>
          </div>
          <CoachesList />
        </>
      )}
    </div>
  );
};
