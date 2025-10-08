import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type TAddWorkoutExerciseRequest = {
  relationId: string;
  date: string;
  name: string;
  sets: number;
  reps: number;
  workingWeight: number;
};

export const addWorkoutExerciseApi = async ({
  relationId,
  ...data
}: TAddWorkoutExerciseRequest) => {
  const response = await api.post<
    Omit<TAddWorkoutExerciseRequest, 'relationId'>,
    AxiosResponse
  >(`/client-coach/${relationId}/workouts`, data);

  return response.data;
};
