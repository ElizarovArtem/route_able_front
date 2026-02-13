import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  deleteAiWorkoutTemplate,
  type DeleteAiWorkoutTemplateRequest,
} from '@/d.features/aiAssistant/api/requests/delete-ai-workout-template.request.ts';

export const useDeleteAiWorkoutTemplate = (
  options?: MutationOptions<null, AxiosError, DeleteAiWorkoutTemplateRequest>,
) => {
  return useMutation<null, AxiosError, DeleteAiWorkoutTemplateRequest>({
    mutationFn: deleteAiWorkoutTemplate,
    ...options,
  });
};
