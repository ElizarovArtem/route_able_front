import { useQueryClient } from '@tanstack/react-query';
import type { ModalProps } from 'antd';
import React, { useState } from 'react';

import { useCreateTimeSlot } from '@/d.features/lessons';
import {
  UiButton,
  UiDatepicker,
  UiFlex,
  UiModal,
  UiTypography,
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

  const { mutate } = useCreateTimeSlot({
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
    <UiModal {...props} title="Создание слота" centered>
      <UiFlex direction="column">
        <UiFlex>
          <UiDatepicker
            defaultValue={startDate}
            placeholder="Начало"
            showTime
            onChange={(date) => setStartDate(date as Date)}
          />
          <UiTypography> - </UiTypography>
          <UiDatepicker
            defaultValue={endDate}
            minDate={startDate}
            placeholder="Окончание"
            showTime
            onChange={(date) => setEndDate(date as Date)}
          />
        </UiFlex>

        <UiFlex justify="end">
          <UiButton onClick={createLessonSlot}>Добавить</UiButton>
        </UiFlex>
      </UiFlex>
    </UiModal>
  );
};
