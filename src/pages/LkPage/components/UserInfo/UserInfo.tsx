import React from 'react';

import { useSelector } from '@/hooks/useSelector.ts';
import { UserInfoItem } from '@/pages/LkPage/components/UserInfo/components/UserInfoItem/UserInfoItem.tsx';
import { userSelector } from '@/store/usersStore.ts';

import styles from './UserInfo.module.scss';

export const UserInfo = () => {
  const { user } = useSelector(userSelector);

  return (
    <div className={styles.info}>
      <UserInfoItem title="Имя" value={user?.name || '-'} />
      <UserInfoItem title="Номер телефона" value={user?.phone || '-'} />
      <UserInfoItem title="Электронная почта" value={user?.email || '-'} />
      <UserInfoItem
        title="О себе"
        value={user?.email || '-'}
        className={styles.note}
      />
    </div>
  );
};
