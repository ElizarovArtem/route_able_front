import { Link } from '@tanstack/react-router';
import React, { useMemo } from 'react';

import { Roles } from '@/e.entities/user';
import { useGetConnections } from '@/e.entities/user/api';
import type { GetConnectionsResponseItem } from '@/e.entities/user/api/requests/get-connections.request.ts';
import { ConnectionCard } from '@/e.entities/user/ui/ConnectionCard/ConnectionCard.tsx';
import { UiCard, UiFlex, UiTypography } from '@/f.shared/ui';
import { UiLink } from '@/f.shared/ui/UiLink/UiLink.tsx';

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
        clients: GetConnectionsResponseItem[];
        coaches: GetConnectionsResponseItem[];
      },
    );
  }, [data]);

  return (
    <UiCard>
      <UiFlex direction="column" gap="xs">
        <UiTypography bold>
          {connectionsType === 'coaches' ? 'Мои тренеры' : 'Мои подопечные'}
        </UiTypography>

        {connectionsType === 'coaches' ? (
          coaches.length ? (
            coaches.map((coach) => (
              <ConnectionCard
                key={coach.clientCoachId}
                isActive={Boolean(coach.isActive)}
                connection={coach.partner}
                toRole={Roles.Coach}
              />
            ))
          ) : (
            <UiTypography>
              У вас пока нет тренера.{' '}
              <UiLink to="/">Перейти к списку тренеров</UiLink>
            </UiTypography>
          )
        ) : null}

        {connectionsType === 'clients' ? (
          clients ? (
            clients.map((client) => (
              <ConnectionCard
                key={client.clientCoachId}
                isActive={Boolean(client.isActive)}
                connection={client.partner}
                toRole={Roles.Client}
              />
            ))
          ) : (
            <UiTypography>У вас пока нет ни одного подопечного</UiTypography>
          )
        ) : null}
      </UiFlex>
    </UiCard>
  );
};
