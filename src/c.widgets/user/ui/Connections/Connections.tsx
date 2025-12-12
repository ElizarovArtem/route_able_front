import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo, useState } from 'react';

import { Roles, userSelector } from '@/e.entities/user';
import { useGetConnections } from '@/e.entities/user/api';
import type { GetConnectionsResponseItem } from '@/e.entities/user/api/requests/get-connections.request.ts';
import { ConnectionCard } from '@/e.entities/user/ui/ConnectionCard/ConnectionCard.tsx';
import { useSelector } from '@/f.shared/lib';
import { UiCard, UiTabs, UiTypography } from '@/f.shared/ui';

enum TabsKeys {
  myClients = 'myClients',
  myCoaches = 'myCoaches',
}

export const Connections = () => {
  const [currentTab, setCurrentTab] = useState<TabsKeys>(TabsKeys.myCoaches);

  const { user } = useSelector(userSelector);

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

  const tabs = useMemo((): TabsProps['items'] => {
    return [
      {
        key: TabsKeys.myCoaches,
        label: 'Мои тренеры',
        children: coaches.length
          ? coaches.map((coach) => (
              <ConnectionCard
                key={coach.clientCoachId}
                isActive={Boolean(coach.isActive)}
                connection={coach.partner}
                toRole={Roles.Coach}
              />
            ))
          : null,
      },
      ...(user?.roles.includes(Roles.Coach)
        ? [
            {
              key: TabsKeys.myClients,
              label: 'Мои клиенты',
              children: clients ? (
                clients.map((client) => (
                  <ConnectionCard
                    key={client.clientCoachId}
                    isActive={Boolean(client.isActive)}
                    connection={client.partner}
                    toRole={Roles.Client}
                  />
                ))
              ) : (
                <UiTypography>
                  У вас пока нет ни одного подопечного
                </UiTypography>
              ),
            },
          ]
        : []),
    ];
  }, [user, data]);

  return (
    <UiCard>
      <UiTabs
        inverse
        activeKey={currentTab}
        onChange={(key) => setCurrentTab(key as TabsKeys)}
        items={tabs}
      />
    </UiCard>
  );
};
