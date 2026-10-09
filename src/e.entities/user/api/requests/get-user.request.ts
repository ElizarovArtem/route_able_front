import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

import type { User } from '../../model/user.types.ts';

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<User, AxiosResponse<User>>(`user/byId/${id}`);

  return response.data;
};
