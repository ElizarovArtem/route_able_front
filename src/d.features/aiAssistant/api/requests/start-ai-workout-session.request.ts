import type { AxiosResponse } from 'axios';

import type { AiWorkoutSession } from '@/e.entities/aiAssistant';
import { api } from '@/f.shared/api';

export type StartAiWorkoutSessionRequest = {
  sessionId: string;
};

export const startAiWorkoutSession = async ({
  sessionId,
}: StartAiWorkoutSessionRequest) => {
  const { data } = await api.patch<null, AxiosResponse<AiWorkoutSession>>(
    `/ai/workouts/${sessionId}/start`,
  );

  return data;
};
