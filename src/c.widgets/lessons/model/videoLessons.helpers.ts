import { LessonStatus } from '@/e.entities/lessons/model/lessons.constants.ts';
import { type CoachWorkoutSession } from '@/e.entities/lessons/model/lessons.types.ts';

import {
  EARLY_JOIN_MINUTES,
  LATE_JOIN_MINUTES,
} from './videoLessons.constants.ts';

const MINUTE_IN_MS = 60_000;

type VideoLessonDto = CoachWorkoutSession & {
  startAt?: string;
  endAt?: string;
};

export type VideoLessonWithSessionFields = Omit<
  VideoLessonDto,
  'status' | 'startAt' | 'endAt'
> & {
  status: LessonStatus;
  startAt: string;
  endAt: string;
};

const mapServerStatusToLesson = (
  status?: CoachWorkoutSession['status'] | LessonStatus,
): LessonStatus => {
  if (
    status === LessonStatus.SCHEDULED ||
    status === LessonStatus.IN_PROGRESS ||
    status === LessonStatus.COMPLETED ||
    status === LessonStatus.CANCELED
  ) {
    return status;
  }

  switch (status) {
    case 'BOOKED':
      return LessonStatus.SCHEDULED;
    case 'COMPLETED_BY_COACH':
    case 'CONFIRMED_BY_CLIENT':
    case 'AUTO_CONFIRMED':
      return LessonStatus.COMPLETED;
    case 'CANCELLED_BY_CLIENT':
    case 'CANCELLED_BY_COACH':
    case 'NO_SHOW_CLIENT':
    case 'NO_SHOW_COACH':
    case 'DISPUTED':
      return LessonStatus.CANCELED;
    default:
      return LessonStatus.SCHEDULED;
  }
};

const computeEndAt = (lesson: VideoLessonDto, startAt: string) => {
  if (lesson.endAt) return lesson.endAt;
  const duration = Number(lesson.durationMinutes);
  if (!Number.isFinite(duration) || duration <= 0) return startAt;

  const startDate = new Date(startAt);
  if (Number.isNaN(startDate.getTime())) {
    return startAt;
  }

  return new Date(startDate.getTime() + duration * MINUTE_IN_MS).toISOString();
};

export const normalizeVideoLessons = (
  lessons: VideoLessonDto[] | undefined,
): VideoLessonWithSessionFields[] => {
  if (!lessons?.length) return [];

  const now = new Date();

  return lessons.map((lesson) => {
    const startAt =
      lesson.startAt ?? lesson.scheduledAt ?? new Date().toISOString();
    const endAt = computeEndAt(lesson, startAt);

    const startDate = new Date(startAt);
    const endDate = new Date(endAt);

    let status = mapServerStatusToLesson(lesson.status);

    if (
      status !== LessonStatus.CANCELED &&
      !Number.isNaN(startDate.getTime()) &&
      !Number.isNaN(endDate.getTime())
    ) {
      if (now >= startDate && now <= endDate) {
        status = LessonStatus.IN_PROGRESS;
      } else if (now > endDate) {
        status = LessonStatus.COMPLETED;
      } else {
        status = LessonStatus.SCHEDULED;
      }
    }

    const normalizedLesson: VideoLessonWithSessionFields = {
      ...lesson,
      startAt,
      endAt,
      status,
    };

    return normalizedLesson;
  });
};

export const formatRange = (lesson: VideoLessonWithSessionFields) => {
  const start = new Date(lesson.startAt);
  const end = new Date(lesson.endAt);
  const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
  const endFormatter = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${dateFormatter.format(start)} — ${endFormatter.format(end)}`;
};

export const isWithinJoinWindow = (lesson: VideoLessonWithSessionFields) => {
  if (lesson.status === LessonStatus.CANCELED) {
    return false;
  }
  const start = new Date(lesson.startAt);
  const end = new Date(lesson.endAt);
  const now = new Date();

  const from = new Date(start.getTime() - EARLY_JOIN_MINUTES * 60_000);
  const to = new Date(end.getTime() + LATE_JOIN_MINUTES * 60_000);

  return now >= from && now <= to;
};
