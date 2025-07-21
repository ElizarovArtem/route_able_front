import type { RefetchOptions } from '@tanstack/query-core';
import { type QueryObserverResult } from '@tanstack/react-query';
import { format } from 'date-fns';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  mealFormResolver,
  type TCreateMealFormData,
  useAddMeal,
} from '@/d.features/meal';
import { MealType, type TGetDayMealsSummaryRes } from '@/e.entities/meal';
import { FormInput, FormSelect, UiButton } from '@/f.shared/ui';

import styles from './AddMeal.module.scss';

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

export const AddMeal = ({ refetch }: TMealFormProps) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const onSuccess = () => {
    console.log('meals created successfully.');
    refetch();
    setIsFormVisible(false);
  };

  const { mutate: createMealMutation } = useAddMeal(onSuccess);

  const { control, handleSubmit } = useForm<TCreateMealFormData>({
    resolver: mealFormResolver,
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
