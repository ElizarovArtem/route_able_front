import { useQuery } from '@tanstack/react-query';

import {
  getMessages,
  type GetMessagesResponse,
} from '../requests/get-messages.request.ts';

export const useGetMessages = (chatId: string) => {
  return useQuery<GetMessagesResponse[]>({
    queryKey: ['messages', chatId],
    queryFn: () => getMessages(chatId),
    enabled: !!chatId,
  });
};
