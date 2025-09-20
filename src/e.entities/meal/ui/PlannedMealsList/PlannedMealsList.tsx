import React, { useState } from 'react';

import { useGetPlannedMeals } from '@/e.entities/meal/api/queries/useGetPlannedMeals.ts';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';
import { UiTitle } from '@/f.shared/ui';
import { UiDatepicker } from '@/f.shared/ui/UiDatepicker/UiDatepicker.tsx';

import styles from './PlannedMealsList.module.scss';

type PlannedMealsListProps = {
  relationId?: string;
};

export const PlannedMealsList = ({ relationId }: PlannedMealsListProps) => {
  const [date, setDate] = useState(new Date());

  const { data, refetch } = useGetPlannedMeals({
    date: formatDateForServer(date),
    relationId,
  });

  const onDateChange = (date: Date | Date[]) => {
    setDate(date as Date);
    refetch();
  };

  return (
    <div className={styles.plannedMealsList}>
      <div className={styles.titleWrapper}>
        <UiTitle>Плановые приемы пищи на {formatDateForServer(date)}</UiTitle>{' '}
        <UiDatepicker defaultValue={date} onChange={onDateChange} />
      </div>
      <div className={styles.plannedMealsList}>
        {data?.map((plannedMeal) => (
          <div key={plannedMeal.id} className={styles.plannedMeal}>
            {plannedMeal.text}
          </div>
        ))}
      </div>
    </div>
  );
};
