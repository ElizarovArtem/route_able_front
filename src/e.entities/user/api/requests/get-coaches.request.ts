import type { AxiosResponse } from 'axios';

import type { CoachListItem } from '@/e.entities/user/model/user.types.ts';
import { api } from '@/f.shared/api';

export const getCoaches = async (): Promise<CoachListItem[]> => {
  const response = await api.get<null, AxiosResponse<CoachListItem[]>>(
    '/user/coaches',
  );

  return response.data;
};
