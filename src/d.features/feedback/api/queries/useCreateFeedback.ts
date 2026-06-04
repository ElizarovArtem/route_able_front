import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { createFeedback } from '@/d.features/feedback/api/requests/create-feedback.request.ts';
import type { TCreateFeedbackFormData } from '@/e.entities/feedback/model/resolvers/feedback.create-feedback-resolver.ts';

export const useCreateFeedback = (
  mutationOptions?: MutationOptions<null, AxiosError, TCreateFeedbackFormData>,
) => {
  return useMutation<null, AxiosError, TCreateFeedbackFormData>({
    mutationFn: createFeedback,
    ...mutationOptions,
  });
};
