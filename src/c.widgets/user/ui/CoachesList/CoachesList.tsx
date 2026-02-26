import { useNavigate } from '@tanstack/react-router';
import { Spin } from 'antd';
import React from 'react';

import { useGetCoaches } from '@/e.entities/user/api/queries/useGetCoaches.ts';
import { CoachCard } from '@/e.entities/user/ui/CoachCard/CoachCard.tsx';
import { UiButton, UiCard, UiFlex, UiTitle } from '@/f.shared/ui';

import styles from './CoachesList.module.scss';

export const CoachesList = () => {
  const { data, isLoading } = useGetCoaches();

  const navigate = useNavigate();

  const goToCoaches = () => {
    navigate({ to: '/coaches' });
  };

  return (
    <UiCard inverse className={styles.coachesList}>
      <UiFlex direction="column" justify="space-between">
        <UiTitle size="l">Тренеры месяца</UiTitle>
        {isLoading && <Spin />}
        {data &&
          !isLoading &&
          data.map((coach) => <CoachCard key={coach.id} coach={coach} />)}
        <UiFlex justify="end">
          <UiButton onClick={goToCoaches}>Посмотреть всех</UiButton>
        </UiFlex>
      </UiFlex>
    </UiCard>
  );
};
