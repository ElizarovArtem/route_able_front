import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  reviewCoachVerification,
  type ReviewCoachVerificationRequest,
} from '@/d.features/user/api/requests/review-coach-verification.ts';

export const useRequestCoachVerification = (
  mutationOptions?: MutationOptions<
    null,
    AxiosError,
    ReviewCoachVerificationRequest
  >,
) => {
  return useMutation<null, AxiosError, ReviewCoachVerificationRequest>({
    mutationFn: reviewCoachVerification,
    ...mutationOptions,
  });
};
