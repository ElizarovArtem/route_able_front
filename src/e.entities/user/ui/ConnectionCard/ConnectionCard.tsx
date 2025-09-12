import { Link } from '@tanstack/react-router';
import React from 'react';

import { Roles, type User } from '@/e.entities/user';
import { UiAvatar } from '@/f.shared/ui';

import styles from './ConnectionCard.module.scss';

type ConnectionCardProps = {
  connection: User;
  isActive: boolean;
  toRole: Roles;
};

export const ConnectionCard = ({
  connection,
  isActive,
  toRole,
}: ConnectionCardProps) => {
  return (
    <Link
      to={toRole === Roles.Coach ? '/coach/$coachId' : '/client/$clientId'}
      params={{ coachId: connection.id, clientId: connection.id }}
      className={styles.link}
    >
      <div className={styles.connectionCard}>
        <UiAvatar src={connection.avatar} width={85} height={85} />
        <div className={styles.infoWrapper}>
          <span>{connection.name}</span>
          <span>
            {isActive ? 'Подписка оформлена' : 'Подписка не оформлена'}
          </span>
        </div>
      </div>
    </Link>
  );
};
