import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type TCompleteWorkoutExerciseRequest = {
  exerciseId: string;
  relationId: string;
};

export const completeWorkoutExerciseApi = async ({
  relationId,
  exerciseId,
}: TCompleteWorkoutExerciseRequest) => {
  const response = await api.post<null, AxiosResponse>(
    `/client-coach/${relationId}/workouts/${exerciseId}/complete`,
  );

  return response.data;
};
