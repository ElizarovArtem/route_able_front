import React, { useState } from 'react';

import {
  BookClientFromCoachModal,
  CreateLessonSlotModal,
} from '@/d.features/user';
import { useGetMySlots } from '@/e.entities/lessons';
import { LessonSlot } from '@/e.entities/user';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';
import {
  UiButton,
  UiCard,
  UiDatepicker,
  UiFlex,
  UiTypography,
} from '@/f.shared/ui';

import styles from './LessonSlots.module.scss';

type LessonSlotsProps = {
  className?: string;
};

export const LessonSlots = ({ className }: LessonSlotsProps) => {
  const [open, setOpen] = useState(false);
  const [currentSlotId, setCurrentSlotId] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());

  const { data } = useGetMySlots(formatDateForServer(date));

  return (
    <UiCard
      className={className}
      header={
        <UiFlex align="center" justify="space-between">
          <UiFlex align="center">
            <UiTypography bold>Мои слоты на:</UiTypography>
            <UiDatepicker
              defaultValue={date}
              minDate={new Date()}
              onChange={(date) => setDate(date as Date)}
            />
          </UiFlex>
        </UiFlex>
      }
    >
      <UiFlex direction="column" className={styles.lessonSlotsWrapper}>
        <UiFlex wrap="wrap" className={styles.lessonSlotsList}>
          {data?.map((slot) => (
            <LessonSlot
              key={slot.id}
              timeSlot={slot}
              onClick={() => setCurrentSlotId(slot.id)}
            />
          ))}
        </UiFlex>
        <UiFlex justify="end">
          <UiButton onClick={() => setOpen(true)}>Добавить слот</UiButton>
        </UiFlex>
      </UiFlex>

      <CreateLessonSlotModal
        setOpen={setOpen}
        selectedDate={formatDateForServer(date)}
        open={open}
        onCancel={() => setOpen(false)}
      />
      <BookClientFromCoachModal
        slotId={currentSlotId}
        selectedDate={formatDateForServer(date)}
        setOpen={setCurrentSlotId}
        onCancel={() => setCurrentSlotId(null)}
      />
    </UiCard>
  );
};
