import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo, useState } from 'react';

import { Roles, userSelector } from '@/e.entities/user';
import { useGetConnections } from '@/e.entities/user/api/queries/useGetConnections.ts';
import type { GetConnectionsResponseItem } from '@/e.entities/user/api/requests/get-connections.request.ts';
import { ConnectionCard } from '@/e.entities/user/ui/ConnectionCard/ConnectionCard.tsx';
import { useSelector } from '@/f.shared/lib';
import { UiTabs } from '@/f.shared/ui';

import styles from './Connections.module.scss';

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
        children: coaches.map((coach) => (
          <ConnectionCard
            key={coach.clientCoachId}
            isActive={Boolean(coach.isActive)}
            connection={coach.partner}
            toRole={Roles.Coach}
          />
        )),
      },
      ...(user?.roles.includes(Roles.Coach)
        ? [
            {
              key: TabsKeys.myClients,
              label: 'Мои клиенты',
              children: clients.map((client) => (
                <ConnectionCard
                  key={client.clientCoachId}
                  isActive={Boolean(client.isActive)}
                  connection={client.partner}
                  toRole={Roles.Client}
                />
              )),
            },
          ]
        : []),
    ];
  }, [user, data]);

  return (
    <div className={styles.connectionsWrapper}>
      <UiTabs
        inverse
        activeKey={currentTab}
        onChange={(key) => setCurrentTab(key as TabsKeys)}
        items={tabs}
      />
    </div>
  );
};
