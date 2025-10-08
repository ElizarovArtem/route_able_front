import React from 'react';

import type { TGetDayMealsSummaryRes } from '@/e.entities/meal';
import { UiTypography } from '@/f.shared/ui';

import styles from './MealsSummaryPerDay.module.scss';

type TMealsStatisticPerDayProps = {
  data: TGetDayMealsSummaryRes['summary'] | null;
};

export const MealsSummaryPerDay = ({ data }: TMealsStatisticPerDayProps) => {
  return (
    <div className={styles.statistic}>
      <div className={styles.totalCalories}>
        <UiTypography>Всего за день</UiTypography>
        <UiTypography>{data?.calories} Ккал</UiTypography>
      </div>
      <div className={styles.totalPfc}>
        <UiTypography>Белки: {data?.protein}</UiTypography>
        <UiTypography>Жиры: {data?.fat}</UiTypography>
        <UiTypography>Углеводы: {data?.carbs}</UiTypography>
      </div>
    </div>
  );
};
