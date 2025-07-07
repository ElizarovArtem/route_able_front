import type { RefetchOptions } from '@tanstack/query-core';
import { type QueryObserverResult, useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createMeaApi } from '@/api/meal.ts';
import { UiButton } from '@/components/ui/UiButton/UiButton.tsx';
import { FormInput } from '@/components/ui/UiInput/UiInput.tsx';
import { FormSelect } from '@/components/ui/UiSelector/UiSelector.tsx';
import { MealType } from '@/constants/meal.ts';
import {
  mealFormResolvers,
  type TCreateMealFormData,
} from '@/pages/LkPage/components/MealsInfo/components/MealForm/MealForm.resolver.ts';
import type { TGetDayMealsSummaryRes } from '@/types/meal.ts';

import styles from './MealForm.module.scss';

const MEAL_TYPES: DefaultOptionType[] = [
  { value: MealType.DINNER, label: 'Ужин' },
  { value: MealType.LUNCH, label: 'Обед' },
  { value: MealType.SNACK, label: 'Перекус' },
  { value: MealType.BREAKFAST, label: 'Завтрак' },
];

type TMealFormProps = {
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<TGetDayMealsSummaryRes, Error>>;
};

export const MealForm = ({ refetch }: TMealFormProps) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { mutate: createMealMutation } = useMutation({
    mutationFn: createMeaApi,
    onSuccess: () => {
      console.log('meals created successfully.');
      refetch();
      setIsFormVisible(false);
    },
  });

  const { control, handleSubmit } = useForm<TCreateMealFormData>({
    resolver: mealFormResolvers,
  });

  const createMeal = (data: TCreateMealFormData) => {
    createMealMutation({ ...data, date: format(new Date(), 'yyyy-MM-dd') });
  };

  if (!isFormVisible) {
    return (
      <div className={styles.buttonWrapper}>
        <UiButton onClick={() => setIsFormVisible(true)}>
          Добавить прием пищи
        </UiButton>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(createMeal)} className={styles.form}>
      <div className={styles.formSection}>
        <FormInput name="name" control={control} placeholder="Название блюда" />
        <FormSelect
          name="mealType"
          control={control}
          options={MEAL_TYPES}
          placeholder="Тип приема пищи"
        />
      </div>
      <div className={styles.formSection}>
        <FormInput
          name="calories"
          control={control}
          placeholder="Каллорийность"
        />
        <FormInput name="protein" control={control} placeholder="Белки" />
        <FormInput name="fat" control={control} placeholder="Жиры" />
        <FormInput name="carbs" control={control} placeholder="Углеводы" />
      </div>
      <UiButton htmlType="submit">Добавить</UiButton>
    </form>
  );
};
