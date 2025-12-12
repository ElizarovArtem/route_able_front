import React from 'react';

import { useCreateVideoLesson } from '@/d.features/video/api';
import { UiButton, UiFlex, UiModal } from '@/f.shared/ui';

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
  const { mutate } = useCreateVideoLesson({
    onSuccess,
  });

  const onBookClick = () => {
    if (slotId) {
      mutate({ slotId: slotId });
    }
  };

  return (
    <UiModal
      centered
      title="Забронировать слот этот слот?"
      open={!!slotId}
      onCancel={onClose}
      destroyOnHidden
    >
      <UiFlex direction="column" align="center">
        <UiButton onClick={onBookClick}>Забронировать</UiButton>
      </UiFlex>
    </UiModal>
  );
};
