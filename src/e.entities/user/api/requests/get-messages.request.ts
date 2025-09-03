import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type GetMessagesResponse = {
  id: string;
  chatId: string;
  authorId: string;
  text: string;
  createdAt: string;
};

export const getMessages = async (
  chatId: string,
): Promise<GetMessagesResponse[]> => {
  const response = await api.get<null, AxiosResponse<GetMessagesResponse[]>>(
    `/chats/${chatId}/messages`,
  );

  return response.data;
};
