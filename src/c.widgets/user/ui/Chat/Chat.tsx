import React, { useEffect, useLayoutEffect, useRef } from 'react';

import { useStartChat } from '@/d.features/user/api/queries/useStartChat.ts';
import { SendMessage } from '@/d.features/user/ui/SendMessage/SendMessage.tsx';
import { userSelector } from '@/e.entities/user';
import { useGetMessages } from '@/e.entities/user/api/queries/useGetMessages.ts';
import { UserMessage } from '@/e.entities/user/ui/UserMessage/UserMessage.tsx';
import { useSelector } from '@/f.shared/lib';

import styles from './Chat.module.scss';

type ChatProps = {
  chatId?: string;
  partnerId: string;
  fromCoach?: boolean;
};

export const Chat = ({ partnerId, chatId, fromCoach }: ChatProps) => {
  const { mutate: startChat, data: chatData } = useStartChat();
  const { data } = useGetMessages(chatId || chatData?.id || '');

  const messagesRef = useRef<HTMLDivElement>(null);

  const { user } = useSelector(userSelector);

  useEffect(() => {
    if (!chatId) {
      startChat({ otherUserId: partnerId });
    }
  }, [partnerId]);

  useLayoutEffect(() => {
    if (data && messagesRef.current) {
      messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight });
    }
  }, [data]);

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.messages} ref={messagesRef}>
        {data?.map((message) => (
          <UserMessage
            key={message.id}
            message={message.text}
            isAuthor={message.authorId === user?.id}
            fromCoach={fromCoach}
          />
        ))}
      </div>

      <SendMessage chatId={chatId || chatData?.id} />
    </div>
  );
};
