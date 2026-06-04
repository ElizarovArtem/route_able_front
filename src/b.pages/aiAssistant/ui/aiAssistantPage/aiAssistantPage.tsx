import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo, useState } from 'react';

import { AiAssistant, AiWorkoutSuggestion } from '@/c.widgets/aiAssistant';
import { UiTabs } from '@/f.shared/ui';

enum TabsKeys {
  manual = 'manual',
  aiSuggestion = 'aiSuggestion',
}

export const AiAssistantPage = () => {
  const [currentTab, setCurrentTab] = useState<TabsKeys>(TabsKeys.aiSuggestion);

  const tabs = useMemo((): TabsProps['items'] => {
    return [
      {
        key: TabsKeys.aiSuggestion,
        label: 'Сгенерировать тренировку',
        children: <AiWorkoutSuggestion />,
      },
      {
        key: TabsKeys.manual,
        label: 'Выбрать упражнение',
        children: <AiAssistant />,
      },
    ];
  }, []);

  return (
    <UiTabs
      inverse
      activeKey={currentTab}
      onChange={(key) => setCurrentTab(key as TabsKeys)}
      items={tabs}
    />
  );
};
