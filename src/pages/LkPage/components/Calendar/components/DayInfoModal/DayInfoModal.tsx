import type { ModalProps } from 'antd';
import React from 'react';

import { UiModal } from '@/components/ui/UiModal/UiModal.tsx';
import { MealsList } from '@/pages/LkPage/components/common/MealsList/MealsList.tsx';
import { MealsSummaryPerDay } from '@/pages/LkPage/components/common/MealsSummaryPerDay/MealsSummaryPerDay.tsx';
import { useGetMealByDay } from '@/queries/meal.ts';

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
