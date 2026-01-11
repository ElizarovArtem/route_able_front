import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  makeUserTDEEAnalyzeApi,
  type MakeUserTDEEAnalyzeRequest,
} from '@/d.features/user/api/requests/make-user-tdee-analyze.request.ts';

export const useUpdateUserFatGoals = (
  mutationOptions?: MutationOptions<
    null,
    AxiosError,
    MakeUserTDEEAnalyzeRequest
  >,
) => {
  return useMutation<null, AxiosError, MakeUserTDEEAnalyzeRequest>({
    mutationFn: makeUserTDEEAnalyzeApi,
    ...mutationOptions,
  });
};
