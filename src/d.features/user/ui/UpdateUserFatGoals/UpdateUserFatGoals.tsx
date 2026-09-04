import type { ModalProps } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  type UpdateUserFatGoalsFormData,
  updateUserFatGoalsFormResolver,
} from '@/d.features/user';
import { useUpdateUserFatGoals } from '@/d.features/user/api';
import type { GetDayMealsSummaryRes } from '@/e.entities/meal';
import {
  FormInput,
  UiButton,
  UiFlex,
  UiModal,
  UiModalActions,
} from '@/f.shared/ui';

type UpdateUserFatGoalsProps = {
  onSuccess?: () => void;
  goals?: GetDayMealsSummaryRes['goals']['personal'];
} & ModalProps;

export const UpdateUserFatGoals = ({
  onSuccess,
  goals,
  onCancel,
  ...props
}: UpdateUserFatGoalsProps) => {
  const { control, handleSubmit, reset } = useForm<UpdateUserFatGoalsFormData>({
    resolver: updateUserFatGoalsFormResolver,
  });

  const { isPending, mutate } = useUpdateUserFatGoals({ onSuccess });

  const onFatGoalsSubmit = () => {
    handleSubmit((data) => {
      mutate(data);
    })();
  };

  useEffect(() => {
    reset(goals);
  }, [goals]);

  return (
    <UiModal
      title="Цели КБЖУ"
      description="Задайте дневные ориентиры для отслеживания рациона."
      size="medium"
      onCancel={onCancel}
      {...props}
    >
      <UiFlex direction="column" gap="s">
        <UiFlex gap="s" childrenEqualLength wrap="wrap">
          <FormInput label="Калории, ккал" name="calories" control={control} />
          <FormInput label="Белки, г" name="protein" control={control} />
          <FormInput label="Жиры, г" name="fat" control={control} />
          <FormInput label="Углеводы, г" name="carbs" control={control} />
        </UiFlex>
        <UiModalActions>
          <UiButton
            styleType="secondary"
            onClick={onCancel}
            disabled={isPending}
          >
            Отмена
          </UiButton>
          <UiButton loading={isPending} onClick={onFatGoalsSubmit}>
            Сохранить цели
          </UiButton>
        </UiModalActions>
      </UiFlex>
    </UiModal>
  );
};
