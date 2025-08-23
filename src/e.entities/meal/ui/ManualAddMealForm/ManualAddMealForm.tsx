import type { DefaultOptionType } from 'rc-select/lib/Select';
import React from 'react';
import type { Control } from 'react-hook-form';

import type { TCreateMealFormData } from '@/d.features/meal';
import { FormInput, UiButton } from '@/f.shared/ui';

import styles from './ManualAddMealForm.module.scss';

type ManualAddMealFormProps = {
  control: Control<TCreateMealFormData>;
  onSubmit: () => void;
};

export const ManualAddMealForm = ({
  control,
  onSubmit,
}: ManualAddMealFormProps) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.formSection}>
        <FormInput name="name" control={control} placeholder="Название блюда" />
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
