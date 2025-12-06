import React from 'react';

import { PlannedMealsList, useGetMealGoals } from '@/e.entities/meal';
import { Roles } from '@/e.entities/user';
import { UiCard, UiTitle, UiTypography } from '@/f.shared/ui';

import styles from './MealPlanFromClient.module.scss';

type MealPlanFromClientProps = {
  relationId?: string;
};

export const MealPlanFromClient = ({ relationId }: MealPlanFromClientProps) => {
  const { data: mealGoalsData } = useGetMealGoals({ relationId });

  return (
    <div className={styles.formWrapper}>
      <UiTitle>Мои цели от тренера</UiTitle>
      <div className={styles.goalsWrapper}>
        <UiCard className={styles.goalItem}>
          <UiTypography size="small" type="label">
            Цель по каллорийности
          </UiTypography>
          <UiTypography>
            {mealGoalsData?.goals.goalCalories || '-'}
          </UiTypography>
        </UiCard>
        <UiCard className={styles.goalItem}>
          <UiTypography size="small" type="label">
            Цель по белкам
          </UiTypography>
          <UiTypography>{mealGoalsData?.goals.goalProtein || '-'}</UiTypography>
        </UiCard>
        <UiCard className={styles.goalItem}>
          <UiTypography size="small" type="label">
            Цель по жирам
          </UiTypography>
          <UiTypography>{mealGoalsData?.goals.goalFat || '-'}</UiTypography>
        </UiCard>
        <UiCard className={styles.goalItem}>
          <UiTypography size="small" type="label">
            Цель по углеводам
          </UiTypography>
          <UiTypography>{mealGoalsData?.goals.goalCarbs || '-'}</UiTypography>
        </UiCard>
      </div>

      <PlannedMealsList relationId={relationId} meRole={Roles.Client} />
    </div>
  );
};
