import React, { useState } from 'react';

import { sendMessageWs } from '@/e.entities/user/api/websocket/send-message.ws.ts';
import { getSocket } from '@/f.shared/api/socket.ts';
import { UiButton, UiFlex, UiInput } from '@/f.shared/ui';

import styles from './SendMessage.module.scss';

type SendMessageProps = {
  chatId?: string;
};

export const SendMessage = ({ chatId }: SendMessageProps) => {
  const [text, setText] = useState('');

  const sendMessage = () => {
    const socket = getSocket();

    if (chatId && socket) {
      sendMessageWs({ socket, chatId, text });
      setText('');
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <UiFlex className={styles.sendMessageWrapper}>
      <UiInput
        placeholder="Напишите сообщение"
        value={text}
        onKeyDown={onKeyDown}
        onChange={(e) => setText(e.currentTarget.value)}
        wrapperClassName={styles.input}
      />
      <UiButton onClick={sendMessage}>Отправить</UiButton>
    </UiFlex>
  );
};
