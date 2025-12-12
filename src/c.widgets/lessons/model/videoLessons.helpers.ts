import { type VideoLessonDto } from '@/e.entities/lessons/api/requests/get-video-lessons.request.ts';
import { LessonStatus } from '@/e.entities/lessons/model/lessons.model.ts';

import {
  EARLY_JOIN_MINUTES,
  LATE_JOIN_MINUTES,
} from './videoLessons.constants.ts';

export const formatRange = (lesson: VideoLessonDto) => {
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

export const isWithinJoinWindow = (lesson: VideoLessonDto, now: Date) => {
  if (lesson.status === LessonStatus.CANCELED) {
    return false;
  }
  const start = new Date(lesson.startAt);
  const end = new Date(lesson.endAt);

  const from = new Date(start.getTime() - EARLY_JOIN_MINUTES * 60_000);
  const to = new Date(end.getTime() + LATE_JOIN_MINUTES * 60_000);

  return now >= from && now <= to;
};
