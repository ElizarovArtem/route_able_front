import React from 'react';
import { useShallow } from 'zustand/react/shallow';

import { UiButton } from '@/components/ui/UiButton/UiButton.tsx';
import { UiInput } from '@/components/ui/UiInput/UiInput.tsx';
import { AuthContentType } from '@/constants/auth.ts';
import { authSelector } from '@/store/authStore.ts';
import { rootStore } from '@/store/rootStore.ts';

import styles from './PhoneForm.module.scss';

type TPhoneFormProps = {
  phone: string;
  setPhone: (phone: string) => void;
  setContentType: (value: AuthContentType) => void;
};

export const PhoneForm = ({
  setContentType,
  setPhone,
  phone,
}: TPhoneFormProps) => {
  const { requestCode } = rootStore(useShallow(authSelector));

  const onGetCodeClick = async () => {
    await requestCode(phone);
    setContentType(AuthContentType.code);
  };

  return (
    <div className={styles.content}>
      <UiInput
        value={phone}
        onChange={(e) => setPhone(e.currentTarget.value)}
        placeholder="Введите номер"
        size="large"
        type="number"
      />
      <div className={styles.buttonWrapper}>
        <UiButton onClick={onGetCodeClick}>Получить код</UiButton>
      </div>
    </div>
  );
};
