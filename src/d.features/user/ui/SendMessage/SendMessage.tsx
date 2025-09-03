import React, { useState } from 'react';

import { useSendMessage } from '@/d.features/user';
import { UiButton, UiInput } from '@/f.shared/ui';

import styles from './SendMessage.module.scss';

type SendMessageProps = {
  chatId?: string;
};

export const SendMessage = ({ chatId }: SendMessageProps) => {
  const [text, setText] = useState('');

  const { mutate } = useSendMessage({
    onSuccess: () => {
      setText('');
    },
  });

  const sendMessage = () => {
    if (chatId) {
      mutate({ chatId, text });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={styles.sendMessageWrapper}>
      <UiInput
        placeholder="Напишите сообщение"
        value={text}
        onKeyDown={onKeyDown}
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <UiButton onClick={sendMessage}>Отправить</UiButton>
    </div>
  );
};
