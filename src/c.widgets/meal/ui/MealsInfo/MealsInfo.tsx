import { format } from 'date-fns';
import React from 'react';

import { AddMeal } from '@/d.features/meal';
import {
  MealsList,
  MealsSummaryPerDay,
  useGetMealByDay,
} from '@/e.entities/meal';

import styles from './MealsInfo.module.scss';

export const MealsInfo = () => {
  const date = format(new Date(), 'yyyy-MM-dd');

  const { data, refetch } = useGetMealByDay(date);

  return (
    <div className={styles.info}>
      <MealsSummaryPerDay data={data?.summary || null} />
      <MealsList data={data?.meals || []} />
      <AddMeal refetch={refetch} />
    </div>
  );
};
