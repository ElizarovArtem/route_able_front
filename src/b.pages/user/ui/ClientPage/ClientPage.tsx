import { useParams } from '@tanstack/react-router';
import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo, useState } from 'react';

import {
  Chat,
  MealPlanFromCoach,
  VideoChat,
  WorkoutPlanFromCoach,
} from '@/c.widgets/user';
import { useGetRelation } from '@/e.entities/user/api';
import { UiTabs } from '@/f.shared/ui';

enum TabsKeys {
  chat = 'chat',
  workoutsPlan = 'workoutsPlan',
  mealPlan = 'mealPlan',
  videoChat = 'videoChat',
}

export const ClientPage = () => {
  const [currentTab, setCurrentTab] = useState<TabsKeys>(TabsKeys.mealPlan);
  const clientId = useParams({
    from: '/_private/client/$clientId',
    select: (params) => params.clientId,
  });

  const { data } = useGetRelation(clientId);

  const tabs = useMemo((): TabsProps['items'] => {
    return [
      {
        key: TabsKeys.mealPlan,
        label: 'План питания',
        children: <MealPlanFromCoach relationId={data?.relation?.id} />,
      },
      {
        key: TabsKeys.workoutsPlan,
        label: 'План тренировок',
        children: (
          <WorkoutPlanFromCoach
            relationId={data?.relation?.id}
            meRole={data?.meRole}
          />
        ),
      },
      {
        key: TabsKeys.chat,
        label: 'Чат',
        children: (
          <Chat partnerId={clientId} chatId={data?.chat?.id || ''} fromCoach />
        ),
      },
      {
        key: TabsKeys.videoChat,
        label: 'Видеосвязь',
        children: <VideoChat relationId={data?.relation?.id} />,
        disabled: !data?.relation?.isActive || false,
      },
    ];
  }, [clientId, data]);

  return (
    <UiTabs
      inverse
      activeKey={currentTab}
      onChange={(key) => setCurrentTab(key as TabsKeys)}
      items={tabs}
    />
  );
};
