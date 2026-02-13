import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  deleteAiWorkoutSession,
  type DeleteAiWorkoutSessionRequest,
} from '@/d.features/aiAssistant/api/requests/delete-ai-workout-session.request.ts';

export const useDeleteAiWorkoutSession = (
  options?: MutationOptions<null, AxiosError, DeleteAiWorkoutSessionRequest>,
) => {
  return useMutation<null, AxiosError, DeleteAiWorkoutSessionRequest>({
    mutationFn: deleteAiWorkoutSession,
    ...options,
  });
};
