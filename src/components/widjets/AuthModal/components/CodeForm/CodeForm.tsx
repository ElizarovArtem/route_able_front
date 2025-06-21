import React, { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { UiButton } from '@/components/ui/UiButton/UiButton.tsx';
import { UiInput } from '@/components/ui/UiInput/UiInput.tsx';
import { authSelector } from '@/store/authStore.ts';
import { rootStore } from '@/store/rootStore.ts';

import styles from './CodeForm.module.scss';

type TPhoneFormProps = {
  phone: string;
  onModalClose: () => void;
};

export const CodeForm = ({ onModalClose, phone }: TPhoneFormProps) => {
  const [code, setCode] = useState<string>('');

  const { login } = rootStore(useShallow(authSelector));

  const onSendCodeClick = async () => {
    await login(code, phone);
    onModalClose();
  };

  return (
    <div className={styles.content}>
      <UiInput
        value={code}
        onChange={(e) => setCode(e.currentTarget.value)}
        placeholder="Введите код"
      />
      <UiButton onClick={onSendCodeClick}>Отправить код</UiButton>
    </div>
  );
};
