import type { AxiosResponse } from 'axios';

import type { User } from '@/e.entities/user';
import { api } from '@/f.shared/api';

import type { TUpdateUserFormData } from '../../model/user.update-user-resolver.ts';

export const updateUserApi = async (
  data: TUpdateUserFormData,
): Promise<User> => {
  const response = await api.patch<TUpdateUserFormData, AxiosResponse<User>>(
    '/user',
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  return response.data;
};
