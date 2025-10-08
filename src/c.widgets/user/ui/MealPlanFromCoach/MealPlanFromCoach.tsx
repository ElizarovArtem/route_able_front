import React from 'react';

import { AddMealGoals, AddPlanMeal } from '@/d.features/meal';
import { PlannedMealsList } from '@/e.entities/meal';
import { Roles } from '@/e.entities/user';

import styles from './MealPlanFromCoach.module.scss';

type MealPlanFromCoachProps = {
  relationId?: string;
};

export const MealPlanFromCoach = ({ relationId }: MealPlanFromCoachProps) => {
  return (
    <div className={styles.formWrapper}>
      <AddMealGoals relationId={relationId} />

      <AddPlanMeal relationId={relationId} />

      <PlannedMealsList relationId={relationId} meRole={Roles.Coach} />
    </div>
  );
};
