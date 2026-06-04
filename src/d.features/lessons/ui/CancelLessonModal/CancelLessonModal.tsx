import type { ModalProps } from 'antd';
import React from 'react';

import { useCancelLesson } from '@/d.features/lessons/api';
import { UiButton, UiFlex, UiModal } from '@/f.shared/ui';

type CancelLessonModalProps = {
  sessionId: string | null;
  onSuccess: () => void;
} & ModalProps;

export const CancelLessonModal = ({
  sessionId,
  onSuccess,
  ...props
}: CancelLessonModalProps) => {
  const { mutate } = useCancelLesson({
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
      centered
      title="Отменить это занятие?"
      {...props}
    >
      <UiFlex justify="center">
        <UiButton onClick={onCancelLessonClick}>Отменить</UiButton>
      </UiFlex>
    </UiModal>
  );
};
