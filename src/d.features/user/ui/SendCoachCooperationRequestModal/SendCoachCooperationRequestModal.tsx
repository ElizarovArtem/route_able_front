import type { ModalProps } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useRequestCoachVerification } from '@/d.features/user/api/queries/useRequestCoachVerification.ts';
import type { RequestCoachVerificationRequest } from '@/d.features/user/api/requests/request-coach-verification.ts';
import { FormInput, UiButton, UiFlex, UiModal } from '@/f.shared/ui';

type SendCoachCooperationRequestModalProps = {
  onClose: () => void;
} & ModalProps;

export const SendCoachCooperationRequestModal = ({
  onClose,
  ...props
}: SendCoachCooperationRequestModalProps) => {
  const { mutate: coachVerificationMutation } = useRequestCoachVerification();

  const { control, handleSubmit } = useForm<RequestCoachVerificationRequest>();

  const onRequest = () => {
    handleSubmit((data) => {
      coachVerificationMutation(data);
      onClose();
    })();
  };

  return (
    <UiModal title="Отправить запрос на сотрудничество" {...props}>
      <UiFlex direction="column">
        <FormInput control={control} name="name" label="Ваше имя" />
        <FormInput
          name="contactInfo"
          control={control}
          label="Как с вами связаться"
          placeholder="Телеграм - @super_coach"
        />
        <UiFlex justify="end">
          <UiButton onClick={onRequest}>Отправить</UiButton>
        </UiFlex>
      </UiFlex>
    </UiModal>
  );
};
