import type { AxiosResponse } from 'axios';

import type { AiWorkoutSession } from '@/e.entities/aiAssistant';
import { api } from '@/f.shared/api';

export type RepeatAiWorkoutSessionRequest = {
  sessionId: string;
};

export const repeatAiWorkoutSession = async ({
  sessionId,
}: RepeatAiWorkoutSessionRequest) => {
  const { data } = await api.post<null, AxiosResponse<AiWorkoutSession>>(
    `/ai/workouts/${sessionId}/repeat`,
  );

  return data;
};
