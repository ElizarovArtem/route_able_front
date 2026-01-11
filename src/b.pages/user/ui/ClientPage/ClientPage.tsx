import { useParams } from '@tanstack/react-router';
import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo, useState } from 'react';

import { VideoLessonFromCoach } from '@/c.widgets/lessons';
import {
  Chat,
  MealPlanFromCoach,
  WorkoutPlanFromCoach,
} from '@/c.widgets/user';
import { FatSummary } from '@/e.entities/meal';
import { useGetRelation } from '@/e.entities/user/api';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';
import { UiAvatar, UiCard, UiFlex, UiTabs, UiTypography } from '@/f.shared/ui';

import styles from './ClientPage.module.scss';

enum TabsKeys {
  chat = 'chat',
  workoutsPlan = 'workoutsPlan',
  mealPlan = 'mealPlan',
  videoChat = 'videoChat',
}

export const ClientPage = () => {
  const [currentTab, setCurrentTab] = useState<TabsKeys>(TabsKeys.mealPlan);
  const [date, setDate] = useState(new Date());
  const clientId = useParams({
    from: '/_private/client/$clientId',
    select: (params) => params.clientId,
  });

  const { data } = useGetRelation(clientId, formatDateForServer(date));

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
        children: <VideoLessonFromCoach relationId={data?.relation?.id} />,
        disabled: !data?.relation?.isActive || false,
      },
    ];
  }, [clientId, data]);

  return (
    <UiFlex direction="column">
      <UiCard>
        <UiFlex className={styles.about}>
          <UiAvatar width={200} src={data?.partner.avatar || ''} />
          <UiFlex justify="space-between" flex={1}>
            <UiFlex direction="column" gap="s">
              <UiTypography bold>{data?.partner.name}</UiTypography>
              {data?.partner.about && (
                <UiTypography>{data?.partner.about}</UiTypography>
              )}
              <UiTypography>Рост: {data?.partner.height || '-'}</UiTypography>
              <UiTypography>Вес: {data?.partner.weight || '-'}</UiTypography>
            </UiFlex>

            <FatSummary data={data?.nutrition?.summary} />
          </UiFlex>
        </UiFlex>
      </UiCard>

      <UiTabs
        inverse
        activeKey={currentTab}
        onChange={(key) => setCurrentTab(key as TabsKeys)}
        items={tabs}
      />
    </UiFlex>
  );
};
