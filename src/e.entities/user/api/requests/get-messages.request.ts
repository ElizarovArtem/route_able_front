import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

import type { GetMessagesResponse } from '../../model/user.types.ts';

export type { GetMessagesResponse };

export const getMessages = async (
  chatId: string,
): Promise<GetMessagesResponse[]> => {
  const response = await api.get<null, AxiosResponse<GetMessagesResponse[]>>(
    `/chats/${chatId}/messages`,
  );

  return response.data;
};
