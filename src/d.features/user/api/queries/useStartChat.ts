import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  startChat,
  type StartChatRequest,
  type StartChatResponse,
} from '@/d.features/user/api/requests/start-chat.request.ts';

export const useStartChat = (
  mutationOptions?: MutationOptions<
    StartChatResponse,
    AxiosError,
    StartChatRequest
  >,
) => {
  return useMutation<StartChatResponse, AxiosError, StartChatRequest>({
    mutationFn: startChat,
    ...mutationOptions,
  });
};
