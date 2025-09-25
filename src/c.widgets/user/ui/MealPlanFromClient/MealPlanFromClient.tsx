import React from 'react';

import { PlannedMealsList, useGetMealGoals } from '@/e.entities/meal';

import styles from './MealPlanFromClient.module.scss';

type MealPlanFromClientProps = {
  relationId?: string;
};

export const MealPlanFromClient = ({ relationId }: MealPlanFromClientProps) => {
  const { data: mealGoalsData } = useGetMealGoals({ relationId });

  return (
    <div className={styles.formWrapper}>
      <div className={styles.goalsWrapper}>
        <div className={styles.goalItem}>
          <div>Цель по каллорийности</div>
          <div>{mealGoalsData?.goals.goalCalories || '-'}</div>
        </div>
        <div className={styles.goalItem}>
          <div>Цель по белкам</div>
          <div>{mealGoalsData?.goals.goalProtein || '-'}</div>
        </div>
        <div className={styles.goalItem}>
          <div>Цель по жирам</div>
          <div>{mealGoalsData?.goals.goalFat || '-'}</div>
        </div>
        <div className={styles.goalItem}>
          <div>Цель по углеводам</div>
          <div>{mealGoalsData?.goals.goalCarbs || '-'}</div>
        </div>
      </div>

      <PlannedMealsList relationId={relationId} />
    </div>
  );
};
