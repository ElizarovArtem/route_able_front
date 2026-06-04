import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { Socket } from 'socket.io-client';

import type { GetMessagesResponse } from '@/e.entities/user/api/requests/get-messages.request.ts';

export function useChatRealtime(socket: Socket | null, chatId?: string) {
  const qc = useQueryClient();

  useEffect(() => {
    if (!socket || !chatId) return;

    socket.emit('join_chat', { chatId });

    const onNewMessage = (message: GetMessagesResponse) => {
      if (message.chatId !== chatId) return;

      qc.setQueryData<GetMessagesResponse[]>(
        ['messages', chatId],
        (prevState) => {
          const prevMessages = prevState ?? [];
          if (prevMessages.some((prvMessage) => prvMessage.id === message.id)) {
            return prevMessages;
          }
          return [...prevMessages, message];
        },
      );
    };

    socket.on('new_message', onNewMessage);

    return () => {
      socket.off('new_message', onNewMessage);
      socket.emit('leave_chat', { chatId });
    };
  }, [socket, chatId, qc]);
}
