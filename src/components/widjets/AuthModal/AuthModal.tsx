import React, { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { UiButton } from '@/components/ui/UiButton/UiButton.tsx';
import { UiInput } from '@/components/ui/UiInput/UiInput.tsx';
import { UiModal } from '@/components/ui/UiModal/UiModal.tsx';
import { PhoneForm } from '@/components/widjets/AuthModal/components/PhoneForm/PhoneForm.tsx';
import { AuthContentType } from '@/constants/auth.ts';
import { authSelector } from '@/store/authStore.ts';
import { useStore } from '@/store/useStore.ts';

export const AuthModal = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [contentType, setContentType] = useState<AuthContentType>(
    AuthContentType.phone,
  );
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useStore(
    useShallow(authSelector),
  );

  const onModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const onSendCodeClick = async () => {
    await login(code, phone);
    onModalClose();
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
        <PhoneForm setContentType={setContentType} />
      )}
      {contentType === AuthContentType.code && (
        <>
          <UiInput
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
            placeholder="Введите код"
          />
          <UiButton onClick={onSendCodeClick}>Отправить код</UiButton>
        </>
      )}
    </UiModal>
  );
};
