import type { AxiosResponse } from 'axios';

import type { TUser } from '@/e.entities/user';
import { api } from '@/f.shared/api';

import type { TUpdateUserFormData } from '../../model/user.update-user-resolver.ts';

export const updateUserApi = async (
  data: TUpdateUserFormData,
): Promise<TUser> => {
  const response = await api.patch<TUpdateUserFormData, AxiosResponse<TUser>>(
    '/user',
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  return response.data;
};
