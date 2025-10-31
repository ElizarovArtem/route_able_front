import { api } from '@/f.shared/api';

export type GetAssistantTokenResponse = {
  token: string;
  url: string;
  room: string;
  meRole: string;
};

export const getAssistantToken = async (roomId: string) => {
  const { data } = await api.get<GetAssistantTokenResponse>(
    '/video/assistant-token',
    {
      params: { roomId },
    },
  );

  return data;
};

