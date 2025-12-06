import React, { useState } from 'react';

import { UpdateUserModal } from '@/d.features/user/ui/UpdateUserModal/UpdateUserModal.tsx';
import { Roles, UserInfoItem, userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import { UiButton, UiCard, UiFlex, UiTitle } from '@/f.shared/ui';
import { UiAvatar } from '@/f.shared/ui/UiAvatar/UiAvatar.tsx';

import styles from './UserInfo.module.scss';

export const UserInfo = () => {
  const { user } = useSelector(userSelector);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  const isMobile = useMobile();

  return (
    <UiCard className={styles.info}>
      <UiFlex direction="column">
        <UiAvatar src={user?.avatar} />
        <UiButton onClick={() => setIsUpdateUserModalOpen(true)}>
          Обновить
        </UiButton>
      </UiFlex>

      <UiFlex direction="column">
        <UiFlex direction="column" gap="xs">
          <UiTitle>Профиль</UiTitle>
          <UiFlex
            direction={isMobile ? 'column' : 'row'}
            gap={isMobile ? 's' : 'm'}
          >
            <UserInfoItem
              title="Амплуа"
              value={
                user?.roles.includes(Roles.Coach) ? 'Тренер' : 'Занимающийся'
              }
            />
            <UserInfoItem title="Имя" value={user?.name || ''} />
            <UserInfoItem title="Рост, см" value={user?.height || ''} />
            <UserInfoItem title="Вес, кг" value={user?.weight || ''} />
          </UiFlex>
          <UserInfoItem
            title="О себе"
            value={user?.about || ''}
            className={styles.about}
          />
        </UiFlex>

        <UiFlex direction="column" gap="xs">
          <UiTitle>Контактные данные</UiTitle>
          <UiFlex
            direction={isMobile ? 'column' : 'row'}
            gap={isMobile ? 's' : 'm'}
          >
            <UserInfoItem title="Номер телефона" value={user?.phone || ''} />
            <UserInfoItem title="Электронная почта" value={user?.email || ''} />
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
