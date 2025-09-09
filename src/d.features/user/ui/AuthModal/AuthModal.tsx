import React, { useState } from 'react';

import { AuthContentType, authSelector } from '@/d.features/user';
import { UserAuthCodeForm, UserAuthPhoneForm } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { UiModal } from '@/f.shared/ui/UiModal/UiModal.tsx';

export const AuthModal = () => {
  const [phone, setPhone] = useState('');
  const [contentType, setContentType] = useState<AuthContentType>(
    AuthContentType.phone,
  );
  const { isAuthModalOpen, setIsAuthModalOpen } = useSelector(authSelector);

  const onModalClose = () => {
    setPhone('');
    setIsAuthModalOpen(false);
    setContentType(AuthContentType.phone);
  };

  return (
    <UiModal
      open={isAuthModalOpen}
      onCancel={onModalClose}
      title="Авторизация / Регистрация"
      centered
      footer={null}
    >
      {contentType === AuthContentType.phone && (
        <UserAuthPhoneForm
          phone={phone}
          setPhone={setPhone}
          setContentType={setContentType}
        />
      )}
      {contentType === AuthContentType.code && (
        <UserAuthCodeForm phone={phone} onModalClose={onModalClose} />
      )}
    </UiModal>
  );
};
