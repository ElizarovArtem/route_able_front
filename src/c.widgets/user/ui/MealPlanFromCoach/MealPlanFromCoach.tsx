import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useAddPlannedMeal } from '@/d.features/meal/api';
import { AddMealGoals } from '@/d.features/meal/ui/AddMealGoals/AddMealGoals.tsx';
import { addPlanMealFormResolver } from '@/e.entities/meal/model/meal.add-plan-meal-resolver.ts';
import { PlannedMealsList } from '@/e.entities/meal/ui';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';
import { FormDatepicker, FormInput, UiButton, UiTitle } from '@/f.shared/ui';

import styles from './MealPlanFromCoach.module.scss';

type PlannedMealForm = {
  planMealDate: Date;
  planMealText: string;
};

type MealPlanFromCoachProps = {
  relationId?: string;
};

export const MealPlanFromCoach = ({ relationId }: MealPlanFromCoachProps) => {
  const {
    control: planMealControl,
    handleSubmit,
    getValues,
    reset,
  } = useForm<PlannedMealForm>({
    defaultValues: {
      planMealDate: new Date(),
    },
    resolver: addPlanMealFormResolver,
  });

  const client = useQueryClient();

  const { mutate } = useAddPlannedMeal({
    onSuccess: () => {
      const values = getValues();
      client.refetchQueries({
        queryKey: [
          'plannedMeals',
          relationId,
          formatDateForServer(values.planMealDate),
        ],
      });
      reset();
    },
  });

  const onPlannedMealCreate = () => {
    if (relationId) {
      handleSubmit((values) => {
        mutate({
          relationId,
          date: formatDateForServer(values.planMealDate),
          text: values.planMealText,
        });
      })();
    }
  };

  return (
    <div className={styles.formWrapper}>
      <AddMealGoals relationId={relationId} />

      <UiTitle>Добавить плановый прием пищи</UiTitle>

      <div className={styles.addPlanMeal}>
        <FormInput
          name="planMealText"
          control={planMealControl}
          placeholder="Описание блюда"
        />
        <FormDatepicker
          name="planMealDate"
          control={planMealControl}
          placeholder="Дата приема пищи"
          defaultValue={getValues().planMealDate}
        />
        <UiButton onClick={onPlannedMealCreate}>Добавить</UiButton>
      </div>

      <PlannedMealsList relationId={relationId} />
    </div>
  );
};
