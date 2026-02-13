import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { AiWorkoutExercise } from '@/e.entities/aiAssistant';

import {
  completeAiWorkoutSet,
  type CompleteAiWorkoutSetRequest,
} from '../requests/complete-ai-workout-set.request';

export const useCompleteAiWorkoutSet = (
  options?: MutationOptions<
    AiWorkoutExercise,
    AxiosError,
    CompleteAiWorkoutSetRequest
  >,
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation<
    AiWorkoutExercise,
    AxiosError,
    CompleteAiWorkoutSetRequest
  >({
    mutationFn: completeAiWorkoutSet,
    ...restOptions,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({
        queryKey: ['aiWorkoutSession', variables.sessionId],
      });
      onSuccess?.(data, variables, context, mutation);
    },
  });
};
