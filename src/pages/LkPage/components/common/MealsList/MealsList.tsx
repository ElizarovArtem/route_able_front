import React from 'react';

import { MealItem } from '@/pages/LkPage/components/common/MealsList/MealItem/MealItem.tsx';
import type { TGetDayMealsSummaryRes, TMeal } from '@/types/meal.ts';

import styles from './MealsList.module.scss';

type TMealsListProps = {
  data: TGetDayMealsSummaryRes['meals'];
};

type TPreparedData = {
  breakfast: TMeal[];
  lunch: TMeal[];
  dinner: TMeal[];
  snack: TMeal[];
};

export const MealsList = ({ data }: TMealsListProps) => {
  const { breakfast, dinner, snack, lunch } = data.reduce<TPreparedData>(
    (acc, value) => {
      acc[value.mealType].push(value);

      return acc;
    },
    {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    },
  );

  return (
    <div className={styles.list}>
      {breakfast.length > 0 && (
        <div className={styles.mealItem}>
          <div className={styles.mealItemTitle}>Завтрак</div>
          {breakfast?.map((meal) => <MealItem key={meal.id} meal={meal} />)}
        </div>
      )}
      {lunch.length > 0 && (
        <div className={styles.mealItem}>
          <div className={styles.mealItemTitle}>Обед</div>
          {lunch?.map((meal) => <MealItem key={meal.id} meal={meal} />)}
        </div>
      )}
      {dinner.length > 0 && (
        <div className={styles.mealItem}>
          <div className={styles.mealItemTitle}>Ужин</div>
          {dinner?.map((meal) => <MealItem key={meal.id} meal={meal} />)}
        </div>
      )}
      {snack.length > 0 && (
        <div className={styles.mealItem}>
          <div className={styles.mealItemTitle}>Перекус</div>
          {snack?.map((meal) => <MealItem key={meal.id} meal={meal} />)}
        </div>
      )}
    </div>
  );
};
