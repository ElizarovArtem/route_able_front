import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useAddWorkoutExercise } from '@/d.features/workouts/api/queries/useAddWorkoutExercise.ts';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';
import { FormDatepicker, FormInput, UiButton } from '@/f.shared/ui';

import styles from './AddWorkoutExercise.module.scss';

type AddWorkoutExerciseFormValues = {
  date: Date;
  name: string;
  sets: number;
  reps: number;
  workingWeight: number;
};

type AddWorkoutExerciseProps = {
  relationId?: string;
};

export const AddWorkoutExercise = ({ relationId }: AddWorkoutExerciseProps) => {
  const { control, handleSubmit, reset, getValues } =
    useForm<AddWorkoutExerciseFormValues>({
      defaultValues: {
        date: new Date(),
      },
    });

  const client = useQueryClient();

  const { mutate } = useAddWorkoutExercise({
    onSuccess: () => {
      const values = getValues();

      client.refetchQueries({
        queryKey: ['workouts', relationId, formatDateForServer(values.date)],
      });
      reset();
    },
  });

  const onExerciseCreate = () => {
    handleSubmit(({ date, ...data }) => {
      if (relationId) {
        mutate({
          relationId,
          date: formatDateForServer(date),
          ...data,
        });
      }
    })();
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.addWorkoutExerciseForm}>
        <FormInput
          control={control}
          name="name"
          placeholder="Название упражнения"
          className={styles.long}
        />
        <FormInput
          control={control}
          name="sets"
          placeholder="Кол-во подходов"
          className={styles.short}
          type="number"
        />
        <FormInput
          control={control}
          name="reps"
          placeholder="Кол-во повторов"
          className={styles.short}
          type="number"
        />
        <FormInput
          control={control}
          name="workingWeight"
          placeholder="Рабочий вес"
          className={styles.short}
          type="number"
        />
        <FormDatepicker
          control={control}
          name="date"
          defaultValue={new Date()}
          className={styles.short}
        />
      </form>
      <div className={styles.buttonWrapper}>
        <UiButton onClick={onExerciseCreate}>Добавить</UiButton>
      </div>
    </div>
  );
};
