import type { ModalProps } from 'antd';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';

import { FatSummary, useGetMealByDay } from '@/e.entities/meal';
import { MealItem } from '@/e.entities/meal/ui/MealItem/MealItem.tsx';
import { UiFlex } from '@/f.shared/ui';
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
      <UiFlex direction="column">
        <FatSummary data={data?.summary} goals={data?.goals} />

        <UiFlex direction="column" gap="xs">
          {data?.meals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
        </UiFlex>
      </UiFlex>
    </UiModal>
  );
};
