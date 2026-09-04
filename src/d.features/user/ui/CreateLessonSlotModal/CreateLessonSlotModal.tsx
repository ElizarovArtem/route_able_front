import { useQueryClient } from '@tanstack/react-query';
import type { ModalProps } from 'antd';
import React, { useState } from 'react';

import { useCreateTimeSlot } from '@/d.features/lessons';
import {
  UiButton,
  UiDatepicker,
  UiFlex,
  UiModal,
  UiModalActions,
} from '@/f.shared/ui';

type CreateLessonSlotProps = {
  selectedDate: string;
  setOpen: (open: boolean) => void;
} & ModalProps;

export const CreateLessonSlotModal = ({
  selectedDate,
  setOpen,
  ...props
}: CreateLessonSlotProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const queryClient = useQueryClient();

  const { isPending, mutate } = useCreateTimeSlot({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['coach-slots', selectedDate],
      });
      setOpen(false);
    },
  });

  const createLessonSlot = () => {
    if (startDate && endDate) {
      mutate({
        startAt: startDate.toISOString(),
        endAt: endDate.toISOString(),
      });
    }
  };

  return (
    <UiModal
      {...props}
      title="Новый слот в расписании"
      description="Укажите начало и окончание периода, доступного для бронирования."
      onCancel={() => setOpen(false)}
      size="medium"
    >
      <UiFlex direction="column" gap="s">
        <UiFlex gap="s" childrenEqualLength wrap="wrap">
          <UiDatepicker
            defaultValue={startDate}
            placeholder="Начало"
            label="Начало"
            showTime
            onChange={(date) => setStartDate(date as Date)}
          />
          <UiDatepicker
            defaultValue={endDate}
            minDate={startDate}
            placeholder="Окончание"
            label="Окончание"
            showTime
            onChange={(date) => setEndDate(date as Date)}
          />
        </UiFlex>

        <UiModalActions>
          <UiButton
            styleType="secondary"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Отмена
          </UiButton>
          <UiButton
            loading={isPending}
            disabled={endDate <= startDate}
            onClick={createLessonSlot}
          >
            Добавить слот
          </UiButton>
        </UiModalActions>
      </UiFlex>
    </UiModal>
  );
};
