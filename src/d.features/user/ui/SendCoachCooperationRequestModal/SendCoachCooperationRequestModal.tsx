import type { ModalProps } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useRequestCoachVerification } from '@/d.features/user/api/queries/useRequestCoachVerification.ts';
import type { RequestCoachVerificationRequest } from '@/d.features/user/api/requests/request-coach-verification.ts';
import {
  FormInput,
  UiButton,
  UiCard,
  UiFlex,
  UiModal,
  UiModalActions,
  UiTypography,
} from '@/f.shared/ui';

type SendCoachCooperationRequestModalProps = {
  onClose: () => void;
} & ModalProps;

export const SendCoachCooperationRequestModal = ({
  onClose,
  ...props
}: SendCoachCooperationRequestModalProps) => {
  const { isPending, mutate: coachVerificationMutation } =
    useRequestCoachVerification({
      onSuccess: onClose,
    });

  const { control, handleSubmit } = useForm<RequestCoachVerificationRequest>({
    defaultValues: { name: '', contactInfo: '' },
  });

  const onRequest = () => {
    handleSubmit((data) => {
      coachVerificationMutation(data);
    })();
  };

  return (
    <UiModal
      title="Стать тренером Роутайбл"
      description="Оставьте контакты — команда свяжется с вами и расскажет об условиях сотрудничества."
      size="medium"
      onCancel={onClose}
      {...props}
    >
      <UiFlex direction="column" gap="s">
        <UiCard inverse>
          <UiFlex direction="column" gap="xs">
            <UiTypography bold>Что будет дальше</UiTypography>
            <UiTypography type="secondary" size="small">
              Проверим заявку, обсудим ваш опыт и поможем оформить профиль
              тренера на платформе.
            </UiTypography>
          </UiFlex>
        </UiCard>
        <FormInput
          control={control}
          name="name"
          label="Ваше имя"
          placeholder="Как к вам обращаться"
        />
        <FormInput
          name="contactInfo"
          control={control}
          label="Контакт для связи"
          placeholder="Telegram: @super_coach"
        />
        <UiTypography type="secondary" size="small">
          Отправляя заявку, вы соглашаетесь на связь по указанному контакту.
        </UiTypography>
      </UiFlex>
      <UiModalActions>
        <UiButton styleType="secondary" onClick={onClose} disabled={isPending}>
          Отмена
        </UiButton>
        <UiButton loading={isPending} onClick={onRequest}>
          Отправить заявку
        </UiButton>
      </UiModalActions>
    </UiModal>
  );
};
