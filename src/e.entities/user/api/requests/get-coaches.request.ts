import type { AxiosResponse } from 'axios';

import type { User } from '@/e.entities/user';
import { api } from '@/f.shared/api';

export const getCoaches = async (): Promise<User[]> => {
  const response = await api.get<null, AxiosResponse<User[]>>('/user/coaches');

  return response.data;
};
