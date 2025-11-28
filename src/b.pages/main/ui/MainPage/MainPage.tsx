import React from 'react';

import { CoachesList } from '@/c.widgets/user';
import { authSelector } from '@/d.features/user';
import { userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { UiButton } from '@/f.shared/ui';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  const { setIsAuthModalOpen } = useSelector(authSelector);
  const { user } = useSelector(userSelector);

  const onStartClick = () => {
    setIsAuthModalOpen(true);
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
          <CoachesList />
        </>
      )}
    </div>
  );
};
