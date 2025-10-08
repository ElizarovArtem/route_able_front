import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type TGetWorkoutExercisesRequest = {
  relationId?: string;
  date: string;
};

export type TGetWorkoutExercisesResponse = {
  authorId: string;
  clientCoachId: string;
  clientId: string;
  coachId: string;
  createdAt: string;
  date: string;
  id: string;
  name: string;
  notes: null;
  order: number;
  reps: number;
  sets: number;
  completed: boolean;
  updatedAt: string;
  workingWeight: number;
}[];

export const getWorkoutExercisesApi = async ({
  relationId,
  ...params
}: TGetWorkoutExercisesRequest) => {
  const response = await api.get<
    Omit<TGetWorkoutExercisesRequest, 'relationId'>,
    AxiosResponse<TGetWorkoutExercisesResponse>
  >(`/client-coach/${relationId}/workouts`, {
    params,
  });

  return response.data;
};
