import type { AxiosResponse } from 'axios';

import type { AiWorkoutExercise } from '@/e.entities/aiAssistant';
import { api } from '@/f.shared/api';

export type CompleteAiWorkoutSetRequest = {
  sessionId: string;
  exerciseId: string;
};

export const completeAiWorkoutSet = async ({
  sessionId,
  exerciseId,
}: CompleteAiWorkoutSetRequest) => {
  const { data } = await api.patch<null, AxiosResponse<AiWorkoutExercise>>(
    `/ai/workouts/${sessionId}/exercises/${exerciseId}/complete-set`,
  );

  return data;
};
