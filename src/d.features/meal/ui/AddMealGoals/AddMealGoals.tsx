import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { SetMealGoalsRequest } from '@/d.features/meal';
import { useSetMealGoals } from '@/d.features/meal';
import { useGetMealGoals } from '@/e.entities/meal';
import { FormInput, UiButton, UiTitle } from '@/f.shared/ui';

import styles from './AddMealGoals.module.scss';

type AddMealGoalsProps = {
  relationId?: string;
};

export const AddMealGoals = ({ relationId }: AddMealGoalsProps) => {
  const {
    control: goalsControl,
    handleSubmit: goalsHandleSubmit,
    reset: resetMealGoals,
  } = useForm<Omit<SetMealGoalsRequest, 'relationId'>>();

  const { data: mealGoalsData } = useGetMealGoals({ relationId });

  const { mutate: setGoalsMutate } = useSetMealGoals();

  const onSetMealGoals = () => {
    if (relationId) {
      goalsHandleSubmit((values) => {
        setGoalsMutate({
          relationId,
          ...values,
        });
      })();
    }
  };

  useEffect(() => {
    if (mealGoalsData) {
      resetMealGoals({
        goalCalories: mealGoalsData.goals.goalCalories,
        goalCarbs: mealGoalsData.goals.goalCarbs,
        goalFat: mealGoalsData.goals.goalFat,
        goalProtein: mealGoalsData.goals.goalProtein,
      });
    }
  }, [mealGoalsData]);

  return (
    <>
      <UiTitle>Цели по КБЖУ</UiTitle>

      <div className={styles.goalsWrapper}>
        <FormInput
          name="goalCalories"
          control={goalsControl}
          placeholder="Цель по каллорийности"
          type="number"
        />
        <FormInput
          name="goalProtein"
          control={goalsControl}
          placeholder="Цель по белкам"
          type="number"
        />
        <FormInput
          name="goalFat"
          control={goalsControl}
          placeholder="Цель по жирам"
          type="number"
        />
        <FormInput
          name="goalCarbs"
          control={goalsControl}
          placeholder="Цель по углеводам"
          type="number"
        />
        <UiButton onClick={onSetMealGoals}>Сохранить</UiButton>
      </div>
    </>
  );
};
