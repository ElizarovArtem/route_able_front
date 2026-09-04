import type { ModalProps } from 'antd';
import React from 'react';

import { useCancelLesson } from '@/d.features/lessons/api';
import { UiButton, UiModal, UiModalActions, UiTypography } from '@/f.shared/ui';

type CancelLessonModalProps = {
  sessionId: string | null;
  onSuccess: () => void;
} & ModalProps;

export const CancelLessonModal = ({
  sessionId,
  onSuccess,
  onCancel,
  ...props
}: CancelLessonModalProps) => {
  const { isPending, mutate } = useCancelLesson({
    onSuccess,
  });

  const onCancelLessonClick = () => {
    if (sessionId) {
      mutate({ sessionId });
    }
  };

  return (
    <UiModal
      open={!!sessionId}
      title="Отменить это занятие?"
      description="Бронирование будет отменено. Если занятие уже оплачено, условия возврата зависят от правил тренера."
      onCancel={onCancel}
      size="small"
      tone="danger"
      {...props}
    >
      <UiTypography type="secondary">
        Это действие нельзя отменить. При необходимости вы сможете выбрать
        другой свободный слот.
      </UiTypography>
      <UiModalActions>
        <UiButton styleType="secondary" onClick={onCancel} disabled={isPending}>
          Оставить занятие
        </UiButton>
        <UiButton
          styleType="danger"
          loading={isPending}
          onClick={onCancelLessonClick}
        >
          Отменить занятие
        </UiButton>
      </UiModalActions>
    </UiModal>
  );
};
