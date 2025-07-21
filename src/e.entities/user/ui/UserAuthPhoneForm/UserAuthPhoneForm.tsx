import React from 'react';

import { AuthContentType, authSelector } from '@/d.features/user';
import { useSelector } from '@/f.shared/lib';
import { UiButton, UiInput } from '@/f.shared/ui';

import styles from './UserAuthPhoneForm.module.scss';

type TPhoneFormProps = {
  phone: string;
  setPhone: (phone: string) => void;
  setContentType: (value: AuthContentType) => void;
};

export const UserAuthPhoneForm = ({
  setContentType,
  setPhone,
  phone,
}: TPhoneFormProps) => {
  const { requestCode } = useSelector(authSelector);

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
      />
      <div className={styles.buttonWrapper}>
        <UiButton onClick={onGetCodeClick}>Получить код</UiButton>
      </div>
    </div>
  );
};
