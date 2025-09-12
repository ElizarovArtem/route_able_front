import React, { useState } from 'react';

import { UpdateUserModal } from '@/d.features/user/ui/UpdateUserModal/UpdateUserModal.tsx';
import { Roles, UserInfoItem, userSelector } from '@/e.entities/user';
import { config } from '@/f.shared/config';
import { useSelector } from '@/f.shared/lib';
import { UiButton } from '@/f.shared/ui';
import { UiAvatar } from '@/f.shared/ui/UiAvatar/UiAvatar.tsx';

import styles from './UserInfo.module.scss';

export const UserInfo = () => {
  const { user } = useSelector(userSelector);

  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  return (
    <div className={styles.info}>
      <div className={styles.avatarWrapper}>
        <UiAvatar src={user?.avatar} />
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
      <UserInfoItem
        title="Амплуа"
        value={user?.roles.includes(Roles.Coach) ? 'Тренер' : 'Занимающийся'}
      />
      <UserInfoItem
        title="Электронная почта"
        value={user?.email || ''}
        className={styles.gridTextItem}
      />
      <UserInfoItem
        title="О себе"
        value={user?.about || ''}
        className={styles.about}
      />
      <UiButton onClick={() => setIsUpdateUserModalOpen(true)}>
        Обновить
      </UiButton>

      <UpdateUserModal
        setOpenModal={setIsUpdateUserModalOpen}
        open={isUpdateUserModalOpen}
        onCancel={() => setIsUpdateUserModalOpen(false)}
      />
    </div>
  );
};
