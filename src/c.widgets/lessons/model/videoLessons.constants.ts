import { LessonStatus } from '@/e.entities/lessons/model/lessons.model.ts';

export const EARLY_JOIN_MINUTES = 5;
export const LATE_JOIN_MINUTES = 10;
export const NOW_REFRESH_MS = 30_000;

export const lessonStatusLabels: Record<LessonStatus, string> = {
  [LessonStatus.SCHEDULED]: 'Запланирован',
  [LessonStatus.IN_PROGRESS]: 'В процессе',
  [LessonStatus.COMPLETED]: 'Завершён',
  [LessonStatus.CANCELED]: 'Отменён',
};
