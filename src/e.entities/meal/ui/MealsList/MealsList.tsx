import React from 'react';

import type { TGetDayMealsSummaryRes } from '@/e.entities/meal';

import { MealListItem } from './MealList.Item.tsx';
import styles from './MealsList.module.scss';

type TMealsListProps = {
  data: TGetDayMealsSummaryRes['meals'];
};

export const MealsList = ({ data }: TMealsListProps) => {
  return (
    <div className={styles.list}>
      {data.map((meal) => (
        <MealListItem key={meal.id} meal={meal} />
      ))}
    </div>
  );
};
