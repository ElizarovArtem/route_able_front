import React from 'react';

import type { PlannedLesson } from '@/e.entities/lessons/model/lessons.types.ts';
import { UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

type VideoLessonProps = {
  lesson: PlannedLesson;
};

export const PlannedVideoLesson = ({ lesson }: VideoLessonProps) => {
  const date = new Date(lesson.startAt).toLocaleDateString();
  const startTime = new Date(lesson.startAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = new Date(lesson.endAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <UiCard inverse>
      <UiFlex justify="space-between">
        <UiTypography>{date}</UiTypography>
        <UiFlex gap="xs">
          <UiTypography>{startTime}</UiTypography>
          {'-'}
          <UiTypography>{endTime}</UiTypography>
        </UiFlex>
        <UiTypography>{lesson.client.name}</UiTypography>
      </UiFlex>
    </UiCard>
  );
};
