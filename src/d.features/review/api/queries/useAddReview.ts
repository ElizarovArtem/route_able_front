import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  addReviewApi,
  type AddReviewRequest,
} from '@/d.features/review/api/requests/add-review.request.ts';

export const useAddReview = (
  mutationOptions?: MutationOptions<void, AxiosError, AddReviewRequest>,
) => {
  return useMutation<void, AxiosError, AddReviewRequest>({
    mutationFn: addReviewApi,
    ...mutationOptions,
  });
};
