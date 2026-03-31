import type { PlannedLesson } from '@/e.entities/lessons/model/lessons.types.ts';
import { api } from '@/f.shared/api';

export type GetClientLessonsParams = {
  date: string;
};

export type GetClientLessonsResponse = {
  items: PlannedLesson[];
  total: number;
  skip: number;
  take: number;
};

export const getClientLessons = async ({ date }: GetClientLessonsParams) => {
  const { data } = await api.get<GetClientLessonsResponse>(
    '/coach-workout-sessions/client/upcoming',
    {
      params: { date },
    },
  );

  return data;
};
