import { type CoachWorkoutSession } from '@/e.entities/lessons/model/lessons.types.ts';
import type { Relation } from '@/e.entities/user/model/user.types.ts';
import { api } from '@/f.shared/api';

type GetCanJoinResponse = {
  link: Relation;
  session: CoachWorkoutSession | null;
};

export const getCanJoin = async (relationId: string) => {
  const { data } = await api.get<GetCanJoinResponse>(
    `/coach-workout-sessions/relation/${relationId}/can-join`,
  );
  return data;
};
