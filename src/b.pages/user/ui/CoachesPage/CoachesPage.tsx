import React from 'react';

import { useGetCoaches } from '@/e.entities/user';
import { CoachCard } from '@/e.entities/user/ui/CoachCard/CoachCard.tsx';
import { UiFlex, UiTypography } from '@/f.shared/ui';

export const CoachesPage = () => {
  const { data, isLoading } = useGetCoaches();

  return (
    <UiFlex direction="column">
      <UiTypography bold size="large">
        Список тренеров
      </UiTypography>

      {data &&
        !isLoading &&
        data.map((coach) => <CoachCard key={coach.id} coach={coach} />)}
    </UiFlex>
  );
};
