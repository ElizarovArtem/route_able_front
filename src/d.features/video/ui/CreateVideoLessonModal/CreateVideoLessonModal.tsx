import React from 'react';

import { useCreateVideoLesson } from '@/d.features/video/api';
import { UiButton, UiModal, UiModalActions, UiTypography } from '@/f.shared/ui';

type CreateVideoLessonModalProps = {
  slotId: string | null;
  onClose: () => void;
  onSuccess: () => void;
};

export const CreateVideoLessonModal = ({
  slotId,
  onClose,
  onSuccess,
}: CreateVideoLessonModalProps) => {
  const { isPending, mutate } = useCreateVideoLesson({
    onSuccess,
  });

  const onBookClick = () => {
    if (slotId) {
      mutate({ slotId: slotId });
    }
  };

  return (
    <UiModal
      title="Забронировать этот слот?"
      description="После подтверждения занятие появится в вашем расписании."
      open={!!slotId}
      onCancel={onClose}
      destroyOnHidden
      size="small"
    >
      <UiTypography type="secondary">
        Убедитесь, что выбранное время вам подходит. Отменить бронирование можно
        будет из карточки занятия.
      </UiTypography>
      <UiModalActions>
        <UiButton styleType="secondary" onClick={onClose} disabled={isPending}>
          Назад
        </UiButton>
        <UiButton loading={isPending} onClick={onBookClick}>
          Забронировать
        </UiButton>
      </UiModalActions>
    </UiModal>
  );
};
