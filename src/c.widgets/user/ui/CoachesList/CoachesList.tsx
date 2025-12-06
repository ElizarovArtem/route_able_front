import { Spin } from 'antd';
import React from 'react';

import { useGetCoaches } from '@/e.entities/user/api/queries/useGetCoaches.ts';
import { CoachCard } from '@/e.entities/user/ui/CoachCard/CoachCard.tsx';
import { UiCard, UiFlex, UiTitle } from '@/f.shared/ui';

import styles from './CoachesList.module.scss';

export const CoachesList = () => {
  const { data, isLoading } = useGetCoaches();

  return (
    <UiCard inverse className={styles.coachesList}>
      <UiFlex direction="column">
        <UiTitle size="l">Тренеры</UiTitle>
        {isLoading && <Spin />}
        {data &&
          !isLoading &&
          data.map((coach) => <CoachCard key={coach.id} coach={coach} />)}
      </UiFlex>
    </UiCard>
  );
};
