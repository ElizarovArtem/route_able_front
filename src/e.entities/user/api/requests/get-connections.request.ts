import type { AxiosResponse } from 'axios';

import type { MyConnectionsItem } from '@/e.entities/user/model/user.types.ts';
import { api } from '@/f.shared/api';

export const getConnections = async (): Promise<MyConnectionsItem[]> => {
  const response = await api.get<null, AxiosResponse<MyConnectionsItem[]>>(
    `/client-coach/my`,
  );

  return response.data;
};
