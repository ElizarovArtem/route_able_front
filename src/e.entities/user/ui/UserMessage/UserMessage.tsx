import classNames from 'classnames';
import React from 'react';

import styles from './UserMessage.module.scss';

type UserMessageProps = {
  message: string;
  isAuthor?: boolean;
  fromCoach?: boolean;
};

export const UserMessage = ({
  message,
  isAuthor,
  fromCoach,
}: UserMessageProps) => {
  const partnerLabel = fromCoach ? 'Клиент' : 'Тренер';

  return (
    <div
      className={classNames(styles.messageWrapper, {
        [styles.authorMessage]: isAuthor,
      })}
    >
      <div
        className={classNames(styles.message, {
          [styles.authorMessage]: isAuthor,
        })}
      >
        <div className={styles.userName}>{isAuthor ? 'Я' : partnerLabel}</div>
        <div>{message}</div>
      </div>
    </div>
  );
};
