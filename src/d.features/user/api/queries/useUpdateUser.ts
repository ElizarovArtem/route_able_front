import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { TUpdateUserFormData } from '@/d.features/user/model/user.update-user-resolver.ts';
import type { TUser } from '@/e.entities/user';

import { updateUserApi } from '../requests/update-user.request.ts';

export const useUpdateUser = (
  mutationOptions: MutationOptions<TUser, AxiosError, TUpdateUserFormData>,
) => {
  return useMutation<TUser, AxiosError, TUpdateUserFormData>({
    mutationFn: updateUserApi,
    ...mutationOptions,
  });
};
