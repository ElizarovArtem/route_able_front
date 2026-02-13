import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type DeleteAiWorkoutSessionRequest = {
  sessionId: string;
};

export const deleteAiWorkoutSession = async ({
  sessionId,
}: DeleteAiWorkoutSessionRequest) => {
  const { data } = await api.delete<null, AxiosResponse<null>>(
    `/ai/workouts/${sessionId}`,
  );

  return data;
};
