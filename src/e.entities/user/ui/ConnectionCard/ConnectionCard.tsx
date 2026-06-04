import { Link } from '@tanstack/react-router';
import React from 'react';

import { Roles, type User } from '@/e.entities/user';
import type { MyConnectionsItemSessions } from '@/e.entities/user/model/user.types.ts';
import { UiAvatar, UiFlex, UiTypography } from '@/f.shared/ui';

import styles from './ConnectionCard.module.scss';

type ConnectionCardProps = {
  connection: User;
  isActive: boolean;
  toRole: Roles;
  sessions?: MyConnectionsItemSessions;
};

export const ConnectionCard = ({
  connection,
  isActive,
  toRole,
  sessions,
}: ConnectionCardProps) => {
  return (
    <Link
      to={toRole === Roles.Coach ? '/coach/$coachId' : '/client/$clientId'}
      params={{ coachId: connection.id, clientId: connection.id }}
    >
      <UiFlex align="center" className={styles.connectionCard}>
        <UiAvatar
          src={connection.avatar}
          width={85}
          height={85}
          preview={false}
        />
        <UiFlex>
          <UiFlex direction="column" gap="xs">
            <UiTypography bold>{connection.name}</UiTypography>
            <UiTypography>
              {isActive ? 'Подписка оформлена' : 'Подписка не оформлена'}
            </UiTypography>
          </UiFlex>
          {sessions ? (
            <>
              <UiTypography label="Осталось">{sessions.remaining}</UiTypography>
              <UiTypography label="Проведено">{sessions.used}</UiTypography>
            </>
          ) : null}
        </UiFlex>
      </UiFlex>
    </Link>
  );
};
