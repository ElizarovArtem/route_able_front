import { api } from '@/f.shared/api';

export type SendMessageRequest = {
  chatId: string;
  text: string;
};

export const sendMessage = async ({ chatId, ...data }: SendMessageRequest) => {
  return api.post<null, null>(`/chats/${chatId}/messages`, data);
};
