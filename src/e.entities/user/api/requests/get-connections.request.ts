import type { AxiosResponse } from 'axios';

import { Roles, type User } from '@/e.entities/user';
import { api } from '@/f.shared/api';

export type GetConnectionsResponseItem = {
  myRole: Roles;
  partnerRole: Roles;
  chatId: string;
  clientCoachId: string;
  partner: User;
  isActive?: boolean;
};

export const getConnections = async (): Promise<
  GetConnectionsResponseItem[]
> => {
  const response = await api.get<
    null,
    AxiosResponse<GetConnectionsResponseItem[]>
  >(`/relations/my`);

  return response.data;
};
