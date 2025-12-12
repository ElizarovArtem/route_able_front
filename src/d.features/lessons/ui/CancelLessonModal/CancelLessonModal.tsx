import type { ModalProps } from 'antd';
import React from 'react';

import { useCancelLesson } from '@/d.features/lessons/api';
import { UiButton, UiFlex, UiModal } from '@/f.shared/ui';

type CancelLessonModalProps = {
  relationId: string;
  lessonId: string | null;
  onSuccess: () => void;
} & ModalProps;

export const CancelLessonModal = ({
  lessonId,
  relationId,
  onSuccess,
  ...props
}: CancelLessonModalProps) => {
  const { mutate } = useCancelLesson({
    onSuccess,
  });

  const onCancelLessonClick = () => {
    if (lessonId) {
      mutate({ lessonId, relationId });
    }
  };

  return (
    <UiModal
      open={!!lessonId}
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
