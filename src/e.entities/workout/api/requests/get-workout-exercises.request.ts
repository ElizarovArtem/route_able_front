import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

import type {
  TGetWorkoutExercisesRequest,
  TGetWorkoutExercisesResponse,
} from '../../model/workout.types.ts';

export type { TGetWorkoutExercisesRequest, TGetWorkoutExercisesResponse };

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
