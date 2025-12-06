import type { AxiosResponse } from 'axios';

import type { User } from '@/e.entities/user';
import { api } from '@/f.shared/api';

export const updateUserApi = async (data: FormData): Promise<User> => {
  const response = await api.patch<FormData, AxiosResponse<User>>(
    '/user',
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  return response.data;
};
