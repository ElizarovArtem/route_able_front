import React, { useState } from 'react';

import { authSelector } from '@/d.features/user';
import { useSelector } from '@/f.shared/lib';
import { UiButton, UiInput } from '@/f.shared/ui';

import styles from './UserAuthCodeForm.module.scss';

type TPhoneFormProps = {
  phone: string;
  onModalClose: () => void;
};

export const UserAuthCodeForm = ({ onModalClose, phone }: TPhoneFormProps) => {
  const [code, setCode] = useState<string>('');

  const { login } = useSelector(authSelector);

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
