import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import React, { useState } from 'react';

import { useCompleteWorkoutExercise } from '@/d.features/workouts/api/queries/useCompleteWorkoutExercise.ts';
import { useDeleteWorkoutExercise } from '@/d.features/workouts/api/queries/useDeleteWorkoutExercise.ts';
import { Roles } from '@/e.entities/user';
import { useGetWorkoutExercises } from '@/e.entities/workout';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';
import {
  UiButton,
  UiCard,
  UiDatepicker,
  UiTitle,
  UiTypography,
} from '@/f.shared/ui';

import styles from './PlannedWorkoutsLIst.module.scss';

type PlannedWorkoutsLIstProps = {
  relationId?: string;
  meRole?: Roles;
};

export const PlannedWorkoutsList = ({
  relationId,
  meRole,
}: PlannedWorkoutsLIstProps) => {
  const [date, setDate] = useState<Date>(new Date());

  const { data, refetch } = useGetWorkoutExercises({
    date: formatDateForServer(date),
    relationId,
  });

  const client = useQueryClient();

  const onSuccess = () => {
    client.refetchQueries({
      queryKey: ['workouts', relationId, formatDateForServer(date)],
    });
  };

  const { mutate: deleteMutate } = useDeleteWorkoutExercise({
    onSuccess,
  });

  const { mutate: completeMutate } = useCompleteWorkoutExercise({
    onSuccess,
  });

  const onDateChange = (date: Date | Date[]) => {
    setDate(date as Date);
    refetch();
  };

  const onExerciseDelete = (exerciseId: string) => {
    if (relationId) {
      deleteMutate({
        relationId,
        exerciseId,
      });
    }
  };

  const onExerciseComplete = (exerciseId: string) => {
    if (relationId) {
      completeMutate({
        relationId,
        exerciseId,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <UiTitle>Список упражнений на {formatDateForServer(date)}</UiTitle>
        <UiDatepicker value={date} onChange={onDateChange} />
      </div>

      <UiCard className={styles.exercisesWrapper}>
        <div className={classNames(styles.tableTemplate, styles.header)}>
          <UiTypography size="small" type="label" bold>
            Название
          </UiTypography>
          <UiTypography size="small" type="label" bold>
            Кол-во подходов, раз
          </UiTypography>
          <UiTypography size="small" type="label" bold>
            Кол-во повторов, раз
          </UiTypography>
          <UiTypography size="small" type="label" bold>
            Рабочий вес, кг
          </UiTypography>
          <UiTypography size="small" type="label" bold>
            Выполнение
          </UiTypography>
          <UiTypography size="small" type="label" bold>
            Действия
          </UiTypography>
        </div>
        {data?.map((exercise) => (
          <UiCard
            key={exercise.id}
            inverse
            className={classNames(styles.tableTemplate, styles.exerciseItem)}
          >
            <UiTypography bold>{exercise.name}</UiTypography>
            <UiTypography bold>{exercise.sets}</UiTypography>
            <UiTypography bold>{exercise.reps}</UiTypography>
            <UiTypography bold>{exercise.workingWeight}</UiTypography>
            <UiTypography bold>
              {exercise.completed ? 'Выполнено' : 'Не выполнено'}
            </UiTypography>
            {meRole === Roles.Client && !exercise.completed && (
              <UiButton onClick={() => onExerciseComplete(exercise.id)}>
                Выполнено
              </UiButton>
            )}
            {meRole === Roles.Coach && (
              <UiButton onClick={() => onExerciseDelete(exercise.id)}>
                Удалить
              </UiButton>
            )}
          </UiCard>
        ))}
      </UiCard>
    </div>
  );
};
