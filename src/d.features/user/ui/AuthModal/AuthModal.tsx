import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AuthContentType, authSelector } from '@/d.features/user';
import {
  UserAuthCodeForm,
  UserAuthEmailForm,
  UserAuthPhoneForm,
} from '@/e.entities/user';
import {
  authFormResolver,
  type TAuthFormData,
} from '@/e.entities/user/model/user.auth-resolver.ts';
import { useSelector } from '@/f.shared/lib';
import { UiModal, UiTabs } from '@/f.shared/ui';

export const AuthModal = () => {
  const [contentType, setContentType] = useState<AuthContentType>(
    AuthContentType.email,
  );
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    requestCodeByPhone,
    requestCodeByEmail,
  } = useSelector(authSelector);

  const { control, getValues, handleSubmit, reset, watch } =
    useForm<TAuthFormData>({
      resolver: authFormResolver,
    });

  const onRequestCode = () => {
    handleSubmit(async (data) => {
      switch (contentType) {
        case AuthContentType.email: {
          if (data.email) {
            await requestCodeByEmail(data.email);
          }
          break;
        }
        case AuthContentType.phone: {
          if (data.phone) {
            await requestCodeByPhone(data.phone);
            break;
          }
        }
      }

      setContentType(AuthContentType.code);
    })();
  };

  const onModalClose = () => {
    reset();
    setIsAuthModalOpen(false);
    setContentType(AuthContentType.email);
  };

  const onTabChange = (tab: AuthContentType) => {
    setContentType(tab);
  };

  const watched = watch(['email', 'phone']);

  const tabs = useMemo((): TabsProps['items'] => {
    return [
      {
        key: AuthContentType.phone,
        label: 'Номер телефона',
        disabled: true,
        children: (
          <UserAuthPhoneForm control={control} onGetCodeClick={onRequestCode} />
        ),
      },
      {
        key: AuthContentType.email,
        label: 'Электоронная почта',
        children: (
          <UserAuthEmailForm control={control} onGetCodeClick={onRequestCode} />
        ),
      },
    ];
  }, [control, watched]);

  return (
    <UiModal
      open={isAuthModalOpen}
      onCancel={onModalClose}
      title="Авторизация / Регистрация"
      centered
      footer={null}
    >
      {contentType === AuthContentType.code ? (
        <UserAuthCodeForm values={getValues()} onModalClose={onModalClose} />
      ) : (
        <UiTabs
          items={tabs}
          onChange={(tab) => onTabChange(tab as AuthContentType)}
          activeKey={contentType}
        />
      )}
    </UiModal>
  );
};
