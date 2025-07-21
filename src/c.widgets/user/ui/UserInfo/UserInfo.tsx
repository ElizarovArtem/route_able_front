import React, { useState } from 'react';

import { UpdateUserModal } from '@/d.features/user/ui/UpdateUserModal/UpdateUserModal.tsx';
import { UserInfoItem, userSelector } from '@/e.entities/user';
import { UserAvatar } from '@/e.entities/user/ui/UserAvatar/UserAvatar.tsx';
import { useSelector } from '@/f.shared/lib';
import { UiButton } from '@/f.shared/ui';

import styles from './UserInfo.module.scss';

export const UserInfo = () => {
  const { user } = useSelector(userSelector);

  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  return (
    <div className={styles.info}>
      <div className={styles.avatarWrapper}>
        <UserAvatar />
      </div>
      <UserInfoItem
        title="Имя"
        value={user?.name || ''}
        className={styles.gridTextItem}
      />
      <UserInfoItem
        title="Номер телефона"
        value={user?.phone || ''}
        className={styles.gridTextItem}
      />
      <UserInfoItem title="Электронная почта" value={user?.email || ''} />
      <UserInfoItem
        title="О себе"
        value={user?.email || ''}
        className={styles.note}
      />
      <UiButton onClick={() => setIsUpdateUserModalOpen(true)}>
        Обновить
      </UiButton>

      <UpdateUserModal
        open={isUpdateUserModalOpen}
        onCancel={() => setIsUpdateUserModalOpen(false)}
      />
    </div>
  );
};
