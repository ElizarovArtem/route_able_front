import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type StartChatRequest = {
  otherUserId: string;
};

export type StartChatResponse = {
  id: string;
  traineeCoachId: string;
};

export const startChat = async (
  params: StartChatRequest,
): Promise<StartChatResponse> => {
  const response = await api.post<null, AxiosResponse<StartChatResponse>>(
    '/chats/start',
    params,
  );

  return response.data;
};
