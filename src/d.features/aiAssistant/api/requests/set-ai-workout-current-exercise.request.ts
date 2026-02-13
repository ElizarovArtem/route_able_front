import type { AxiosResponse } from 'axios';

import type { AiWorkoutSession } from '@/e.entities/aiAssistant';
import { api } from '@/f.shared/api';

export type SetAiWorkoutCurrentExerciseRequest = {
  sessionId: string;
  exerciseId: string;
};

export const setAiWorkoutCurrentExercise = async ({
  sessionId,
  exerciseId,
}: SetAiWorkoutCurrentExerciseRequest) => {
  const { data } = await api.patch<null, AxiosResponse<AiWorkoutSession>>(
    `/ai/workouts/${sessionId}/exercises/${exerciseId}/set-current`,
  );

  return data;
};
