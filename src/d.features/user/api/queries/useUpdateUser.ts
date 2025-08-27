import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { TUpdateUserFormData } from '@/d.features/user/model/user.update-user-resolver.ts';
import type { User } from '@/e.entities/user';

import { updateUserApi } from '../requests/update-user.request.ts';

export const useUpdateUser = (
  mutationOptions: MutationOptions<User, AxiosError, TUpdateUserFormData>,
) => {
  return useMutation<User, AxiosError, TUpdateUserFormData>({
    mutationFn: updateUserApi,
    ...mutationOptions,
  });
};
