import type { ModalProps } from 'antd';
import React from 'react';

import { UiButton, UiFlex, UiInput, UiModal } from '@/f.shared/ui';

type SendCoachCooperationRequestModalProps = {} & ModalProps;

export const SendCoachCooperationRequestModal = (
  props: SendCoachCooperationRequestModalProps,
) => {
  return (
    <UiModal title="Отправить запрос на сотрудничество" {...props}>
      <UiFlex direction="column">
        <UiInput label="Ваше имя" />
        <UiInput
          label="Как с вами связаться"
          placeholder="Телеграм - @super_coach"
        />
        <UiFlex justify="end">
          <UiButton>Отправить</UiButton>
        </UiFlex>
      </UiFlex>
    </UiModal>
  );
};
