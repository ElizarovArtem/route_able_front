import { useNavigate } from '@tanstack/react-router';
import { Spin } from 'antd';
import React from 'react';

import { userSelector } from '@/e.entities/user';
import { useGetCoaches } from '@/e.entities/user/api/queries/useGetCoaches.ts';
import { CoachCard } from '@/e.entities/user/ui/CoachCard/CoachCard.tsx';
import { useSelector } from '@/f.shared/lib';
import { UiButton, UiFlex, UiTitle } from '@/f.shared/ui';

import styles from './CoachesList.module.scss';

export const CoachesList = () => {
  const { user } = useSelector(userSelector);

  const { data, isLoading } = useGetCoaches(user?.id);

  const navigate = useNavigate();

  const goToCoaches = () => {
    navigate({ to: '/coaches' });
  };

  return (
    <UiFlex
      direction="column"
      justify="space-between"
      className={styles.coachesList}
    >
      <UiTitle size="l">Тренеры месяца</UiTitle>
      {isLoading && <Spin />}
      {data &&
        !isLoading &&
        data.map((coach) => <CoachCard key={coach.id} coach={coach} />)}
      <UiFlex justify="end">
        <UiButton onClick={goToCoaches}>Посмотреть всех</UiButton>
      </UiFlex>
    </UiFlex>
  );
};
