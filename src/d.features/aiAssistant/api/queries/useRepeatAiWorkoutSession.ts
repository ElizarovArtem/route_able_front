import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { AiWorkoutSession } from '@/e.entities/aiAssistant';

import {
  repeatAiWorkoutSession,
  type RepeatAiWorkoutSessionRequest,
} from '../requests/repeat-ai-workout-session.request';

export const useRepeatAiWorkoutSession = (
  options?: MutationOptions<
    AiWorkoutSession,
    AxiosError,
    RepeatAiWorkoutSessionRequest
  >,
) => {
  return useMutation<
    AiWorkoutSession,
    AxiosError,
    RepeatAiWorkoutSessionRequest
  >({
    mutationFn: repeatAiWorkoutSession,
    ...options,
  });
};
