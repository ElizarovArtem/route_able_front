import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import React, { useState } from 'react';

import { useCompletePlannedMeal } from '@/d.features/meal/api/queries/useCompletePlannedMeal.ts';
import { useDeletePlannedMeal } from '@/d.features/meal/api/queries/useDeletePlannedMeal.ts';
import { useGetPlannedMeals } from '@/e.entities/meal/api/queries/useGetPlannedMeals.ts';
import { Roles } from '@/e.entities/user';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';
import {
  UiButton,
  UiCard,
  UiDatepicker,
  UiTitle,
  UiTypography,
} from '@/f.shared/ui';

import styles from './PlannedMealsList.module.scss';

type PlannedMealsListProps = {
  relationId?: string;
  meRole?: Roles;
};

export const PlannedMealsList = ({
  relationId,
  meRole,
}: PlannedMealsListProps) => {
  const [date, setDate] = useState(new Date());

  const { data, refetch } = useGetPlannedMeals({
    date: formatDateForServer(date),
    relationId,
  });

  const client = useQueryClient();

  const onSuccess = () => {
    client.refetchQueries({
      queryKey: ['plannedMeals', relationId, formatDateForServer(date)],
    });
  };

  const { mutate: completeMutate } = useCompletePlannedMeal({
    onSuccess,
  });

  const { mutate: deleteMutate } = useDeletePlannedMeal({
    onSuccess,
  });

  const onDateChange = (date: Date | Date[]) => {
    setDate(date as Date);
    refetch();
  };

  const onMealComplete = (plannedMealId: string) => {
    if (relationId) {
      completeMutate({
        relationId,
        plannedMealId,
      });
    }
  };

  const onMealDelete = (plannedMealId: string) => {
    if (relationId) {
      deleteMutate({
        relationId,
        plannedMealId,
      });
    }
  };

  return (
    <div className={styles.plannedMealsListWrapper}>
      <div className={styles.titleWrapper}>
        <UiTitle>Плановые приемы пищи на {formatDateForServer(date)}</UiTitle>{' '}
        <UiDatepicker defaultValue={date} onChange={onDateChange} />
      </div>

      <UiCard className={styles.plannedMealsList}>
        <div className={classNames(styles.tableTemplate, styles.header)}>
          <UiTypography size="small" type="label" bold>
            Название
          </UiTypography>
          <UiTypography size="small" type="label" bold>
            Калории
          </UiTypography>
          <UiTypography size="small" type="label" bold>
            Белки
          </UiTypography>
          <UiTypography size="small" type="label" bold>
            Жиры
          </UiTypography>
          <UiTypography size="small" type="label" bold>
            Углеводы
          </UiTypography>
          <UiTypography size="small" type="label" bold>
            Выполнение
          </UiTypography>
        </div>

        {data?.map((plannedMeal) => (
          <UiCard
            key={plannedMeal.id}
            inverse
            className={classNames(styles.tableTemplate, styles.mealItem)}
          >
            <UiTypography>{plannedMeal.text}</UiTypography>
            <UiTypography>{plannedMeal.calories}</UiTypography>
            <UiTypography>{plannedMeal.protein}</UiTypography>
            <UiTypography>{plannedMeal.fat}</UiTypography>
            <UiTypography>{plannedMeal.carbs}</UiTypography>
            <UiTypography>
              {meRole === Roles.Client && !plannedMeal.isCompleted && (
                <UiButton onClick={() => onMealComplete(plannedMeal.id)}>
                  Выполнено
                </UiButton>
              )}

              {meRole === Roles.Coach && !plannedMeal.isCompleted && (
                <UiButton onClick={() => onMealDelete(plannedMeal.id)}>
                  Удалить
                </UiButton>
              )}
              {plannedMeal.isCompleted && 'Выполнено'}
            </UiTypography>
          </UiCard>
        ))}
      </UiCard>
    </div>
  );
};
