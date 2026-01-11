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
  UiTypography,
} from '@/f.shared/ui';

type UpdateUserFatGoalsProps = {
  onSuccess?: () => void;
  goals?: GetDayMealsSummaryRes['goals']['personal'];
} & ModalProps;

export const UpdateUserFatGoals = ({
  onSuccess,
  goals,
  ...props
}: UpdateUserFatGoalsProps) => {
  const { control, handleSubmit, reset } = useForm<UpdateUserFatGoalsFormData>({
    resolver: updateUserFatGoalsFormResolver,
  });

  const { mutate } = useUpdateUserFatGoals({ onSuccess });

  const onFatGoalsSubmit = () => {
    handleSubmit((data) => {
      mutate(data);
    })();
  };

  useEffect(() => {
    reset(goals);
  }, [goals]);

  return (
    <UiModal title="Обновить цели КБЖУ" centered {...props}>
      <UiFlex direction="column">
        <UiFlex>
          <UiFlex direction="column" gap="xs" align="center">
            <UiTypography type="label">Кал</UiTypography>
            <FormInput name="calories" control={control} />
          </UiFlex>
          <UiFlex direction="column" gap="xs" align="center">
            <UiTypography type="label">Белки</UiTypography>
            <FormInput name="protein" control={control} />
          </UiFlex>
          <UiFlex direction="column" gap="xs" align="center">
            <UiTypography type="label">Жиры</UiTypography>
            <FormInput name="fat" control={control} />
          </UiFlex>
          <UiFlex direction="column" gap="xs" align="center">
            <UiTypography type="label">Углеводы</UiTypography>
            <FormInput name="carbs" control={control} />
          </UiFlex>
        </UiFlex>
        <UiFlex direction="column" justify="end">
          <UiButton onClick={onFatGoalsSubmit}>Обновить</UiButton>
        </UiFlex>
      </UiFlex>
    </UiModal>
  );
};
