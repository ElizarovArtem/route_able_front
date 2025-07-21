import type { ModalProps } from 'antd';
import React from 'react';

import { useGetMealByDay } from '@/e.entities/meal';
import { MealsList } from '@/e.entities/meal/ui/MealsList/MealsList.tsx';
import { MealsSummaryPerDay } from '@/e.entities/meal/ui/MealsSummaryPerDay/MealsSummaryPerDay.tsx';
import { UiModal } from '@/f.shared/ui/UiModal/UiModal.tsx';

type TDayInfoModalProps = {
  selectedDay: string | null;
} & ModalProps;

export const DayInfoModal = ({ selectedDay, ...props }: TDayInfoModalProps) => {
  const { data } = useGetMealByDay(selectedDay || '');

  return (
    <UiModal {...props} open={Boolean(selectedDay)} title={selectedDay}>
      <MealsSummaryPerDay data={data?.summary || null} />
      <MealsList data={data?.meals || []} />
    </UiModal>
  );
};
