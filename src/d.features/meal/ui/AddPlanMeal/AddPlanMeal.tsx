import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useAddPlannedMeal } from '@/d.features/meal';
import { addPlanMealFormResolver } from '@/e.entities/meal/model/meal.add-plan-meal-resolver.ts';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';
import { FormDatepicker, FormInput, UiButton, UiTitle } from '@/f.shared/ui';

import styles from './AddPlanMeal.module.scss';

type PlannedMealForm = {
  planMealDate: Date;
  planCalories: number;
  planProtein: number;
  planFat: number;
  planCarbs: number;
  planMealText: string;
};

type AddPlanMealProps = {
  relationId?: string;
};

export const AddPlanMeal = ({ relationId }: AddPlanMealProps) => {
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
          calories: values.planCalories,
          carbs: values.planCarbs,
          fat: values.planFat,
          protein: values.planProtein,
        });
      })();
    }
  };

  return (
    <>
      <UiTitle>Добавить плановый прием пищи</UiTitle>

      <div className={styles.addPlanMeal}>
        <FormInput
          name="planMealText"
          control={planMealControl}
          placeholder="Описание блюда"
        />
        <FormInput
          name="planCalories"
          control={planMealControl}
          placeholder="Калории"
        />
        <FormInput
          name="planProtein"
          control={planMealControl}
          placeholder="Белки"
        />
        <FormInput
          name="planFat"
          control={planMealControl}
          placeholder="Жиры"
        />
        <FormDatepicker
          name="planMealDate"
          control={planMealControl}
          placeholder="Дата приема пищи"
          defaultValue={getValues().planMealDate}
        />
        <FormInput
          name="planCarbs"
          control={planMealControl}
          placeholder="Углеводы"
        />
        <UiButton onClick={onPlannedMealCreate}>Добавить</UiButton>
      </div>
    </>
  );
};
