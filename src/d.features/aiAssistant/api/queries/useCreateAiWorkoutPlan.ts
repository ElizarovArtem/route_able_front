import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { AiWorkoutSession } from '@/e.entities/aiAssistant';

import {
  createAiWorkoutPlan,
  type CreateAiWorkoutPlanRequest,
} from '../requests/create-ai-workout-plan.request';

export const useCreateAiWorkoutPlan = (
  options?: MutationOptions<
    AiWorkoutSession,
    AxiosError,
    CreateAiWorkoutPlanRequest
  >,
) => {
  return useMutation<AiWorkoutSession, AxiosError, CreateAiWorkoutPlanRequest>({
    mutationFn: createAiWorkoutPlan,
    ...options,
  });
};
