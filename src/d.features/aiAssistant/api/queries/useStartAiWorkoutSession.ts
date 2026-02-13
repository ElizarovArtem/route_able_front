import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { AiWorkoutSession } from '@/e.entities/aiAssistant';

import {
  startAiWorkoutSession,
  type StartAiWorkoutSessionRequest,
} from '../requests/start-ai-workout-session.request';

export const useStartAiWorkoutSession = (
  options?: MutationOptions<
    AiWorkoutSession,
    AxiosError,
    StartAiWorkoutSessionRequest
  >,
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation<
    AiWorkoutSession,
    AxiosError,
    StartAiWorkoutSessionRequest
  >({
    mutationFn: startAiWorkoutSession,
    ...restOptions,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({
        queryKey: ['aiWorkoutSession', variables.sessionId],
      });
      onSuccess?.(data, variables, context, mutation);
    },
  });
};
