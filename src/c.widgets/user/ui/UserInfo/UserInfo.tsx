import React, { useState } from 'react';

import { CalculateTDEEModal } from '@/d.features/user/ui/CalculateTDEEModal/CalculateTDEEModal.tsx';
import { UpdateUserModal } from '@/d.features/user/ui/UpdateUserModal/UpdateUserModal.tsx';
import { userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { PencilIcon, TargetIcon, UiBadge, UiButton, UiCard, UiFlex } from '@/f.shared/ui';
import { UiAvatar } from '@/f.shared/ui/UiAvatar/UiAvatar.tsx';

import styles from './UserInfo.module.scss';

export const UserInfo = () => {
  const { user } = useSelector(userSelector);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  const [isTDEEModalOpen, setIsTDEEModalOpen] = useState(false);

  return (
    <UiCard tone="elevated">
      <div className={styles.hero}>
        <div className={styles.avatar}>
          <UiAvatar src={user?.avatar} preview={false} />
        </div>

        <UiFlex direction="column" gap="xs" className={styles.identity}>
          <h1 className={styles.name}>{user?.name || 'Без имени'}</h1>
          <UiFlex wrap="wrap" gap="xs">
            <UiBadge tone="accent">
              {user?.isCoachAgreed ? 'Тренер' : 'Клиент'}
            </UiBadge>
            {user?.email && <UiBadge tone="neutral">{user.email}</UiBadge>}
          </UiFlex>
        </UiFlex>

        <UiFlex gap="xs" className={styles.actions}>
          <UiButton
            styleType="secondary"
            size="middle"
            icon={<PencilIcon size={16} />}
            title="Редактировать профиль"
            onClick={() => setIsUpdateUserModalOpen(true)}
          />
          <UiButton
            styleType="secondary"
            size="middle"
            icon={<TargetIcon size={16} />}
            title="Рассчитать TDEE"
            onClick={() => setIsTDEEModalOpen(true)}
          />
        </UiFlex>
      </div>

      <UpdateUserModal
        setOpenModal={setIsUpdateUserModalOpen}
        open={isUpdateUserModalOpen}
        onCancel={() => setIsUpdateUserModalOpen(false)}
      />
      <CalculateTDEEModal
        open={isTDEEModalOpen}
        onCancel={() => setIsTDEEModalOpen(false)}
        onClose={() => setIsTDEEModalOpen(false)}
      />
    </UiCard>
  );
};
