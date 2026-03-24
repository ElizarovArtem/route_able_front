import { type CoachWorkoutSession } from '@/e.entities/lessons/model/lessons.types.ts';
import { api } from '@/f.shared/api';

export const getVideoLessons = async (relationId: string) => {
  const { data } = await api.get<CoachWorkoutSession[]>(
    `/coach-workout-sessions/relation/${relationId}`,
  );
  return data;
};
