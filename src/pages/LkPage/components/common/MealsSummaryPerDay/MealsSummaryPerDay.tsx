import React from 'react';

import type { TGetDayMealsSummaryRes } from '@/types/meal.ts';

import styles from './MealsSummaryPerDay.module.scss';

type TMealsStatisticPerDayProps = {
  data: TGetDayMealsSummaryRes['summary'] | null;
};

export const MealsSummaryPerDay = ({ data }: TMealsStatisticPerDayProps) => {
  return (
    <div className={styles.statistic}>
      <div className={styles.totalCalories}>
        <span>Всего за день</span>
        <span>{data?.calories} Ккал</span>
      </div>
      <div className={styles.totalPfc}>
        <div>Белки: {data?.protein}</div>
        <div>Жиры: {data?.fat}</div>
        <div>Углеводы: {data?.carbs}</div>
      </div>
      <div></div>
    </div>
  );
};
