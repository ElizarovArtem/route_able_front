import { format } from 'date-fns';
import React from 'react';

import { MealsList } from '@/pages/LkPage/components/common/MealsList/MealsList.tsx';
import { MealsSummaryPerDay } from '@/pages/LkPage/components/common/MealsSummaryPerDay/MealsSummaryPerDay.tsx';
import { MealForm } from '@/pages/LkPage/components/MealsInfo/components/MealForm/MealForm.tsx';
import { useGetMealByDay } from '@/queries/meal.ts';

import styles from './MealsInfo.module.scss';

export const MealsInfo = () => {
  const date = format(new Date(), 'yyyy-MM-dd');

  const { data, refetch } = useGetMealByDay(date);

  return (
    <div className={styles.info}>
      <MealsSummaryPerDay data={data?.summary || null} />
      <MealsList data={data?.meals || []} />
      <MealForm refetch={refetch} />
    </div>
  );
};
