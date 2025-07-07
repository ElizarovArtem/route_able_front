import React from 'react';

import styles from '@/pages/LkPage/components/common/MealsList/MealsList.module.scss';
import type { TMeal } from '@/types/meal.ts';

type TMealItemProps = {
  meal: TMeal;
};

export const MealItem = ({ meal }: TMealItemProps) => {
  return (
    <div key={meal.id} className={styles.meal}>
      <div className={styles.paramItem}>
        <span className={styles.paramItemTitle}>Название</span>
        <span className={styles.paramItemValue}>{meal.name}</span>
      </div>
      <div className={styles.paramItem}>
        <span className={styles.paramItemTitle}>Калории</span>
        <span className={styles.paramItemValue}>{meal.calories}</span>
      </div>
      <div className={styles.paramItem}>
        <span className={styles.paramItemTitle}>Белки</span>
        <span className={styles.paramItemValue}>{meal.protein}</span>
      </div>
      <div className={styles.paramItem}>
        <span className={styles.paramItemTitle}>Жиры</span>
        <span className={styles.paramItemValue}>{meal.fat}</span>
      </div>
      <div className={styles.paramItem}>
        <span className={styles.paramItemTitle}>Углеводы</span>
        <span className={styles.paramItemValue}>{meal.carbs}</span>
      </div>
    </div>
  );
};
