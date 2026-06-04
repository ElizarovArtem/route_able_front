import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  requestCoachVerification,
  type RequestCoachVerificationRequest,
} from '@/d.features/user/api/requests/request-coach-verification.ts';

export const useRequestCoachVerification = (
  mutationOptions?: MutationOptions<
    null,
    AxiosError,
    RequestCoachVerificationRequest
  >,
) => {
  return useMutation<null, AxiosError, RequestCoachVerificationRequest>({
    mutationFn: requestCoachVerification,
    ...mutationOptions,
  });
};
