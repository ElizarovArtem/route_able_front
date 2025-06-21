import React, { useState } from 'react';

import { UiModal } from '@/components/ui/UiModal/UiModal.tsx';
import { CodeForm } from '@/components/widjets/AuthModal/components/CodeForm/CodeForm.tsx';
import { PhoneForm } from '@/components/widjets/AuthModal/components/PhoneForm/PhoneForm.tsx';
import { AuthContentType } from '@/constants/auth.ts';
import { useSelector } from '@/hooks/useSelector.ts';
import { authSelector } from '@/store/authStore.ts';

export const AuthModal = () => {
  const [phone, setPhone] = useState('');
  const [contentType, setContentType] = useState<AuthContentType>(
    AuthContentType.phone,
  );
  const { isAuthModalOpen, setIsAuthModalOpen } = useSelector(authSelector);

  const onModalClose = () => {
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
        <PhoneForm
          phone={phone}
          setPhone={setPhone}
          setContentType={setContentType}
        />
      )}
      {contentType === AuthContentType.code && (
        <CodeForm phone={phone} onModalClose={onModalClose} />
      )}
    </UiModal>
  );
};
