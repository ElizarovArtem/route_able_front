import type { AxiosResponse } from 'axios';

import type { AiWorkoutSession } from '@/e.entities/aiAssistant';
import { api } from '@/f.shared/api';

export type CreateAiWorkoutPlanRequest = {
  intent?: string;
  energyLevel: number;
  sleepQuality: number;
  nutritionQuality: number;
};

export const createAiWorkoutPlan = async (
  payload: CreateAiWorkoutPlanRequest,
) => {
  const { data } = await api.post<
    CreateAiWorkoutPlanRequest,
    AxiosResponse<AiWorkoutSession>
  >('/ai/workouts/plan', payload);

  return data;
};
