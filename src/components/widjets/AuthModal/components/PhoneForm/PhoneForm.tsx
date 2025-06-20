import classNames from 'classnames';
import React, { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { UiButton } from '@/components/ui/UiButton/UiButton.tsx';
import { UiInput } from '@/components/ui/UiInput/UiInput.tsx';
import { AuthContentType } from '@/constants/auth.ts';
import { Roles } from '@/constants/user.ts';
import { authSelector } from '@/store/authStore.ts';
import { useStore } from '@/store/useStore.ts';

import styles from './PhoneForm.module.scss';

type TPhoneFormProps = {
  setContentType: (value: AuthContentType) => void;
};

export const PhoneForm = ({ setContentType }: TPhoneFormProps) => {
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<Roles>(Roles.Ward);

  const { getCode } = useStore(useShallow(authSelector));

  const onGetCodeClick = async () => {
    await getCode(phone, role);
    setContentType(AuthContentType.code);
  };

  return (
    <div className={styles.content}>
      <div className={styles.rolesWrapper}>
        <span
          className={classNames(styles.role, {
            [styles.activeRole]: role === Roles.Ward,
          })}
          onClick={() => setRole(Roles.Ward)}
        >
          Я - посетитель спортивного зала
        </span>
        <span
          className={classNames(styles.role, {
            [styles.activeRole]: role === Roles.Trainer,
          })}
          onClick={() => setRole(Roles.Trainer)}
        >
          Я - тренер
        </span>
      </div>
      <UiInput
        value={phone}
        onChange={(e) => setPhone(e.currentTarget.value)}
        placeholder="Введите номер"
      />
      <div className={styles.buttonWrapper}>
        <UiButton onClick={onGetCodeClick}>Получить код</UiButton>
      </div>
    </div>
  );
};
