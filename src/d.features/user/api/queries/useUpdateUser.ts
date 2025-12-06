import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { updateUserApi } from '@/d.features/user';
import type { User } from '@/e.entities/user';

export const useUpdateUser = (
  mutationOptions: MutationOptions<User, AxiosError, FormData>,
) => {
  return useMutation<User, AxiosError, FormData>({
    mutationFn: updateUserApi,
    ...mutationOptions,
  });
};
