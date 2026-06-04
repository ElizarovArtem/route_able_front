import { Link } from '@tanstack/react-router';
import React, { useMemo } from 'react';

import { Roles } from '@/e.entities/user';
import { useGetConnections } from '@/e.entities/user/api';
import type { MyConnectionsItem } from '@/e.entities/user/model/user.types.ts';
import {
  UiCard,
  UiSectionHeader,
  UiTypography,
  UsersIcon,
} from '@/f.shared/ui';
import { UiAvatar } from '@/f.shared/ui/UiAvatar/UiAvatar.tsx';
import { UiLink } from '@/f.shared/ui/UiLink/UiLink.tsx';

import styles from './Connections.module.scss';

type ConnectionsProps = {
  connectionsType: 'clients' | 'coaches';
};

export const Connections = ({ connectionsType }: ConnectionsProps) => {
  const { data } = useGetConnections();

  const { coaches, clients } = useMemo(() => {
    return (data || []).reduce(
      (acc, item) => {
        if (item.partnerRole === Roles.Coach) acc.coaches.push(item);
        if (item.partnerRole === Roles.Client) acc.clients.push(item);
        return acc;
      },
      { clients: [], coaches: [] } as {
        clients: MyConnectionsItem[];
        coaches: MyConnectionsItem[];
      },
    );
  }, [data]);

  const isCoaches = connectionsType === 'coaches';
  const list = isCoaches ? coaches : clients;

  return (
    <UiCard>
      <UiSectionHeader
        icon={<UsersIcon size={18} />}
        title={isCoaches ? 'Мои тренеры' : 'Мои подопечные'}
        subtitle={
          list.length
            ? `Активных: ${list.length}`
            : isCoaches
              ? 'Пока нет тренера'
              : 'Пока нет подопечных'
        }
      />

      {list.length ? (
        <div className={styles.avatarRow}>
          {list.map((item) => (
            <Link
              key={item.clientCoachId}
              to={isCoaches ? '/coach/$coachId' : '/client/$clientId'}
              params={{ coachId: item.partner.id, clientId: item.partner.id }}
              className={styles.avatarItem}
            >
              <div className={styles.avatarWrap}>
                <UiAvatar
                  src={item.partner.avatar}
                  width={52}
                  height={52}
                  preview={false}
                />
                {item.isActive && <span className={styles.activeDot} />}
              </div>
              <span className={styles.avatarName}>
                {item.partner.name || '—'}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <UiTypography type="label">
          {isCoaches ? (
            <>
              У вас пока нет тренера. <UiLink to="/">Найти тренера</UiLink>
            </>
          ) : (
            'Нет подопечных'
          )}
        </UiTypography>
      )}
    </UiCard>
  );
};
