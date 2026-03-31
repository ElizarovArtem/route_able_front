import React from 'react';

import { TimeSlotStatus } from '@/e.entities/lessons/model/lessons.constants.ts';
import { type TimeSlotDto } from '@/e.entities/lessons/model/lessons.types.ts';
import { UiFlex, UiTypography } from '@/f.shared/ui';

import styles from './LessonSlot.module.scss';

type TimeSlotProps = {
  timeSlot: TimeSlotDto;
} & React.HTMLAttributes<HTMLDivElement>;

export const LessonSlot = ({ timeSlot, ...props }: TimeSlotProps) => {
  const date = new Date(timeSlot.startAt).toLocaleDateString();
  const startTime = new Date(timeSlot.startAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = new Date(timeSlot.endAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <UiFlex gap="s" align="start" className={styles.slot} {...props}>
      <UiFlex direction="column" gap="xxs">
        <UiTypography type="label">{date}</UiTypography>
        {timeSlot.status === TimeSlotStatus.FREE && (
          <UiTypography bold>Свободно</UiTypography>
        )}
        {timeSlot.status === TimeSlotStatus.BOOKED && (
          <UiTypography bold>
            Бронь: {timeSlot.bookedSession?.client.name}
          </UiTypography>
        )}
      </UiFlex>
      <UiTypography>
        {startTime} - {endTime}
      </UiTypography>
    </UiFlex>
  );
};
