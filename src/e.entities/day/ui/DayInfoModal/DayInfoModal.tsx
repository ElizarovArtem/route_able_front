import type { ModalProps } from 'antd';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
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
    <UiModal
      {...props}
      open={Boolean(selectedDay)}
      title={
        selectedDay ? format(selectedDay, 'd MMMM yyyy', { locale: ru }) : ''
      }
    >
      <MealsSummaryPerDay data={data?.summary || null} />
      <MealsList data={data?.meals || []} />
    </UiModal>
  );
};
