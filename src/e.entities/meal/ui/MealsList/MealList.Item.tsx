import React from 'react';

import type { TMeal } from '@/e.entities/meal';
import styles from '@/e.entities/meal/ui/MealsList/MealsList.module.scss';
import { UiCard, UiTypography } from '@/f.shared/ui';

type TMealItemProps = {
  meal: TMeal;
};

export const MealListItem = ({ meal }: TMealItemProps) => {
  return (
    <UiCard inverse key={meal.id} className={styles.meal}>
      <div className={styles.paramItem}>
        <UiTypography type="label" size="small">
          Название
        </UiTypography>
        <UiTypography>{meal.name}</UiTypography>
      </div>
      <div className={styles.paramItem}>
        <UiTypography type="label" size="small">
          Калории
        </UiTypography>
        <UiTypography>{meal.calories}</UiTypography>
      </div>
      <div className={styles.paramItem}>
        <UiTypography type="label" size="small">
          Белки
        </UiTypography>
        <UiTypography>{meal.protein}</UiTypography>
      </div>
      <div className={styles.paramItem}>
        <UiTypography type="label" size="small">
          Жиры
        </UiTypography>
        <UiTypography>{meal.fat}</UiTypography>
      </div>
      <div className={styles.paramItem}>
        <UiTypography type="label" size="small">
          Углеводы
        </UiTypography>
        <UiTypography>{meal.carbs}</UiTypography>
      </div>
    </UiCard>
  );
};
