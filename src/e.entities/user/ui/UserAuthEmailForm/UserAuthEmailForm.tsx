import React from 'react';
import { type Control } from 'react-hook-form';

import { FormInput, UiButton } from '@/f.shared/ui';

import styles from './UserAuthEmailForm.module.scss';

type TPhoneFormProps = {
  control: Control;
  onGetCodeClick: () => void;
};

export const UserAuthEmailForm = ({
  control,
  onGetCodeClick,
}: TPhoneFormProps) => {
  return (
    <div className={styles.content}>
      <FormInput
        name="email"
        control={control}
        placeholder="Введите электронную почту"
        size="large"
      />
      <div className={styles.buttonWrapper}>
        <UiButton onClick={onGetCodeClick}>Получить код</UiButton>
      </div>
    </div>
  );
};
