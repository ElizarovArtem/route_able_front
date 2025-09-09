import { useParams, useSearch } from '@tanstack/react-router';
import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo, useState } from 'react';

import { Chat } from '@/c.widgets/user';
import { UiTabs } from '@/f.shared/ui';

enum TabsKeys {
  chat = 'chat',
}

export const ClientPage = () => {
  const [currentTab, setCurrentTab] = useState<TabsKeys>(TabsKeys.chat);
  const clientId = useParams({
    from: '/_private/client/$clientId',
    select: (params) => params.clientId,
  });
  const chatId = useSearch({
    from: '/_private/client/$clientId',
    select: (search) => search.chatId,
  });

  const tabs = useMemo((): TabsProps['items'] => {
    return [
      {
        key: TabsKeys.chat,
        label: 'Чат',
        children: <Chat partnerId={clientId} chatId={chatId} fromCoach />,
      },
    ];
  }, [clientId]);

  return (
    <div>
      <UiTabs
        inverse
        activeKey={currentTab}
        onChange={(key) => setCurrentTab(key as TabsKeys)}
        items={tabs}
      />
    </div>
  );
};
