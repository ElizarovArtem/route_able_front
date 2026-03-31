import classNames from 'classnames';
import React from 'react';

import { lessonStatusLabels } from '@/c.widgets/lessons/model/videoLessons.constants.ts';
import {
  formatRange,
  type VideoLessonWithSessionFields,
} from '@/c.widgets/lessons/model/videoLessons.helpers.ts';
import { LessonStatus } from '@/e.entities/lessons/model/lessons.constants.ts';
import { UiButton, UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

import styles from './CoachWorkoutSession.module.scss';

type CoachWorkoutSessionProps = {
  lesson: VideoLessonWithSessionFields;
  upcomingLesson?: VideoLessonWithSessionFields | null;
  setCancelSessionId?: (lessonId: string) => void;
  onConfirmWorkout?: (lessonId: string) => void;
};

export const CoachWorkoutSession = ({
  lesson,
  upcomingLesson,
  setCancelSessionId,
  onConfirmWorkout,
}: CoachWorkoutSessionProps) => {
  return (
    <UiCard
      key={lesson.id}
      className={classNames(styles.lessonItem, {
        [styles.lessonItemActive]: lesson.id === upcomingLesson?.id,
      })}
    >
      <UiFlex justify="space-between">
        <UiFlex align="center">
          <UiTypography>{formatRange(lesson)}</UiTypography>
          <UiTypography type="label">
            {lessonStatusLabels[lesson.status]}
          </UiTypography>
          {lesson.clientConfirmedAt && (
            <UiTypography bold>Проведение занятия подтверждено</UiTypography>
          )}
        </UiFlex>
        {lesson.status === LessonStatus.SCHEDULED && (
          <UiButton
            styleType="danger"
            onClick={() => setCancelSessionId?.(lesson.id)}
          >
            Отменить
          </UiButton>
        )}
        {lesson.status === LessonStatus.COMPLETED &&
          !lesson.autoConfirmedAt &&
          !lesson.clientConfirmedAt && (
            <UiButton onClick={() => onConfirmWorkout?.(lesson.id)}>
              Подтвердить проведение занятия
            </UiButton>
          )}
      </UiFlex>
    </UiCard>
  );
};
