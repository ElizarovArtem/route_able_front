import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type GetConnectionsResponse = {
  id: string;
  partner: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  traineeCoachId: string;
};

export const getConnections = async (): Promise<GetConnectionsResponse[]> => {
  const response = await api.get<null, AxiosResponse<GetConnectionsResponse[]>>(
    `/chats`,
  );

  return response.data;
};
