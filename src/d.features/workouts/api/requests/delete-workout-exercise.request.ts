import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type TDeleteWorkoutExerciseRequest = {
  exerciseId: string;
  relationId: string;
};

export const deleteWorkoutExerciseApi = async ({
  relationId,
  exerciseId,
}: TDeleteWorkoutExerciseRequest) => {
  const response = await api.delete<null, AxiosResponse>(
    `/client-coach/${relationId}/workouts/${exerciseId}`,
  );

  return response.data;
};
