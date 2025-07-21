import type { ModalProps } from 'antd';
import React from 'react';

import { UiModal } from '@/f.shared/ui';

type TUpdateUserModalProps = {} & ModalProps;

export const UpdateUserModal = (props: TUpdateUserModalProps) => {
  return (
    <UiModal
      title="Обновить информацию о пользователе"
      centered
      footer={null}
      {...props}
    ></UiModal>
  );
};
