import React, { useState } from 'react';

import { UpdateUserModal } from '@/d.features/user/ui/UpdateUserModal/UpdateUserModal.tsx';
import { Roles, UserInfoItem, userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { UiButton, UiCard, UiFlex, UiTitle } from '@/f.shared/ui';
import { UiAvatar } from '@/f.shared/ui/UiAvatar/UiAvatar.tsx';

import styles from './UserInfo.module.scss';

export const UserInfo = () => {
  const { user } = useSelector(userSelector);

  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  return (
    <UiCard className={styles.info}>
      <UiFlex direction="column">
        <UiAvatar src={user?.avatar} />
        <UiButton onClick={() => setIsUpdateUserModalOpen(true)}>
          Обновить
        </UiButton>
      </UiFlex>

      <UiFlex direction="column">
        <UiFlex direction="column" gap="s">
          <UiTitle>Профиль</UiTitle>
          <UiFlex>
            <UserInfoItem
              title="Амплуа"
              value={
                user?.roles.includes(Roles.Coach) ? 'Тренер' : 'Занимающийся'
              }
            />
            <UserInfoItem
              title="Имя"
              value={user?.name || ''}
              className={styles.gridTextItem}
            />
            <UserInfoItem
              title="О себе"
              value={user?.about || ''}
              className={styles.about}
            />
          </UiFlex>
        </UiFlex>

        <UiFlex direction="column">
          <UiTitle>Контактные данные</UiTitle>
          <UiFlex>
            <UserInfoItem
              title="Номер телефона"
              value={user?.phone || ''}
              className={styles.gridTextItem}
            />
            <UserInfoItem
              title="Электронная почта"
              value={user?.email || ''}
              className={styles.gridTextItem}
            />
          </UiFlex>
        </UiFlex>
      </UiFlex>

      <UpdateUserModal
        setOpenModal={setIsUpdateUserModalOpen}
        open={isUpdateUserModalOpen}
        onCancel={() => setIsUpdateUserModalOpen(false)}
      />
    </UiCard>
  );
};
