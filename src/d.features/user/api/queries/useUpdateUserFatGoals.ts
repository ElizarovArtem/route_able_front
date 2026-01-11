import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { UpdateUserFatGoalsFormData } from '@/d.features/user';

import { updateUserFatGoalsApi } from '../requests/update-user-fat-goals.request.ts';

export const useUpdateUserFatGoals = (
  mutationOptions?: MutationOptions<
    null,
    AxiosError,
    UpdateUserFatGoalsFormData
  >,
) => {
  return useMutation<null, AxiosError, UpdateUserFatGoalsFormData>({
    mutationFn: updateUserFatGoalsApi,
    ...mutationOptions,
  });
};
