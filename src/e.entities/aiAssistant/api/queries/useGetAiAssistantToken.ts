import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  getAssistantToken,
  type GetAssistantTokenResponse,
} from '../requests/get-assistant-token.request.ts';

export const useGetAiAssistantToken = (roomId?: string) => {
  return useQuery<GetAssistantTokenResponse, AxiosError>({
    queryKey: ['aiAssistantToken', roomId],
    queryFn: () => getAssistantToken(roomId as string),
    enabled: Boolean(roomId),
    staleTime: 0,
  });
};

