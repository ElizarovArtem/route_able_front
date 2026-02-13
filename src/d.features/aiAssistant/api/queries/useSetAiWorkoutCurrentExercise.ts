import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { AiWorkoutSession } from '@/e.entities/aiAssistant';

import {
  setAiWorkoutCurrentExercise,
  type SetAiWorkoutCurrentExerciseRequest,
} from '../requests/set-ai-workout-current-exercise.request';

export const useSetAiWorkoutCurrentExercise = (
  options?: MutationOptions<
    AiWorkoutSession,
    AxiosError,
    SetAiWorkoutCurrentExerciseRequest
  >,
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation<
    AiWorkoutSession,
    AxiosError,
    SetAiWorkoutCurrentExerciseRequest
  >({
    mutationFn: setAiWorkoutCurrentExercise,
    ...restOptions,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({
        queryKey: ['aiWorkoutSession', variables.sessionId],
      });
      onSuccess?.(data, variables, context, mutation);
    },
  });
};
