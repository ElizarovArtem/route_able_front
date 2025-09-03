import { Link } from '@tanstack/react-router';
import React from 'react';

import { useGetConnections } from '@/e.entities/user/api/queries/useGetConnections.ts';

import styles from './Connections.module.scss';

export const Connections = () => {
  const { data } = useGetConnections();

  console.log(data);

  return (
    <div className={styles.connectionsWrapper}>
      {data?.map((chat) => (
        <Link
          key={chat.id}
          to={`/client/$clientId`}
          params={{ clientId: chat.partner.id }}
          search={{ chatId: chat.id }}
        >
          <div>{chat.partner.name || 'Без имени'}</div>
        </Link>
      ))}
    </div>
  );
};
