import React, { useState } from 'react';

import { CalculateTDEEModal } from '@/d.features/user/ui/CalculateTDEEModal/CalculateTDEEModal.tsx';
import { UpdateUserModal } from '@/d.features/user/ui/UpdateUserModal/UpdateUserModal.tsx';
import { userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { UiButton, UiCard, UiFlex, UiTypography } from '@/f.shared/ui';
import { UiAvatar } from '@/f.shared/ui/UiAvatar/UiAvatar.tsx';

export const UserInfo = () => {
  const { user } = useSelector(userSelector);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  const [isTDEEModalOpen, setIsTDEEModalOpen] = useState(false);

  return (
    <UiCard style={{ flex: 0.3 }}>
      <UiFlex direction="column" align="center" gap="s">
        <UiFlex justify="center">
          <UiAvatar src={user?.avatar} height="auto" />
        </UiFlex>
        <UiTypography bold>{user?.name}</UiTypography>
        <UiTypography type="label">
          {user?.isCoachAgreed ? 'Тренер' : 'Клиент'}
        </UiTypography>
        <UiFlex direction="column" gap="xs">
          <UiButton onClick={() => setIsUpdateUserModalOpen(true)}>
            Редактировать
          </UiButton>
          <UiButton onClick={() => setIsTDEEModalOpen(true)}>
            Рассчитать TDEE
          </UiButton>
        </UiFlex>
      </UiFlex>

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
