import { useParams } from '@tanstack/react-router';
import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo, useState } from 'react';

import { Chat } from '@/c.widgets/user';
import { UiTabs } from '@/f.shared/ui';

enum TabsKeys {
  chat = 'chat',
}

export const CoachPage = () => {
  const [currentTab, setCurrentTab] = useState<TabsKeys>(TabsKeys.chat);
  const coachId = useParams({
    from: '/coach/$coachId',
    select: (params) => params.coachId,
  });

  const tabs = useMemo((): TabsProps['items'] => {
    return [
      {
        key: TabsKeys.chat,
        label: 'Чат',
        children: <Chat partnerId={coachId} />,
      },
    ];
  }, [coachId]);

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
