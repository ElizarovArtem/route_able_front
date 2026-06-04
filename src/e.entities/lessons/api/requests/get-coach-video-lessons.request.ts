import type { PlannedLesson } from '@/e.entities/lessons/model/lessons.types.ts';
import { api } from '@/f.shared/api';

export type GetCoachLessonsParams = {
  date: string;
};

export type GetCoachLessonsResponse = {
  items: PlannedLesson[];
  total: number;
  skip: number;
  take: number;
};

export const getCoachLessons = async ({ date }: GetCoachLessonsParams) => {
  const { data } = await api.get<GetCoachLessonsResponse>(
    '/coach-workout-sessions/coach/day',
    {
      params: { date },
    },
  );

  return data;
};
