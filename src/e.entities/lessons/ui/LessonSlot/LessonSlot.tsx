import React from 'react';

import {
  type TimeSlotDto,
  TimeSlotStatus,
} from '@/e.entities/lessons/model/lessons.model.ts';
import { UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

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
    <UiCard className={styles.slot} {...props}>
      <UiFlex direction="column" gap="xs" align="center">
        <UiTypography type="label">{date}</UiTypography>
        <UiTypography>
          {startTime} - {endTime}
        </UiTypography>

        {timeSlot.status === TimeSlotStatus.FREE && (
          <UiTypography>Свободно</UiTypography>
        )}
        {timeSlot.status === TimeSlotStatus.BOOKED && (
          <UiTypography>
            Бронь: {timeSlot.videoLesson?.client.name}
          </UiTypography>
        )}
      </UiFlex>
    </UiCard>
  );
};
