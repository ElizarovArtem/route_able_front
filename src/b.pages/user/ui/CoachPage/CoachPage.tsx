import { useParams } from '@tanstack/react-router';
import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo, useState } from 'react';

import {
  Chat,
  MealPlanFromClient,
  WorkoutPlanFromClient,
  VideoChat,
} from '@/c.widgets/user';
import { PaySubscription } from '@/d.features/user';
import { useGetRelation } from '@/e.entities/user';
import { UiAvatar, UiTabs, UiTypography } from '@/f.shared/ui';

import styles from './CoachPage.module.scss';

enum TabsKeys {
  chat = 'chat',
  workoutsPlan = 'workoutsPlan',
  mealPlan = 'mealPlan',
  videoChat = 'videoChat',
}

export const CoachPage = () => {
  const [currentTab, setCurrentTab] = useState<TabsKeys>(TabsKeys.mealPlan);
  const coachId = useParams({
    from: '/_private/coach/$coachId',
    select: (params) => params.coachId,
  });

  const { data } = useGetRelation(coachId);

  const tabs = useMemo((): TabsProps['items'] => {
    return [
      {
        key: TabsKeys.mealPlan,
        label: 'План питания',
        children: <MealPlanFromClient relationId={data?.relation?.id} />,
        disabled: !data?.relation?.isActive || false,
      },
      {
        key: TabsKeys.workoutsPlan,
        label: 'План тренировок',
        children: (
          <WorkoutPlanFromClient
            relationId={data?.relation?.id}
            meRole={data?.meRole}
          />
        ),
        disabled: !data?.relation?.isActive || false,
      },
      {
        key: TabsKeys.chat,
        label: 'Чат',
        children: <Chat partnerId={coachId} />,
      },
      {
        key: TabsKeys.videoChat,
        label: 'Видеосвязь',
        children: (
          <VideoChat relationId={data?.relation?.id} meRole={data?.meRole} />
        ),
        disabled: !data?.relation?.isActive || false,
      },
    ];
  }, [coachId, data]);

  return (
    <div className={styles.coachPageWrapper}>
      <div className={styles.about}>
        <UiAvatar width={200} height={200} src={data?.partner.avatar || ''} />
        <div className={styles.aboutInfo}>
          <UiTypography bold>{data?.partner.name}</UiTypography>
          <UiTypography>{data?.partner.about}</UiTypography>
        </div>
        {!data?.relation?.isActive && data?.relation?.id && (
          <PaySubscription
            linkId={data.relation.id}
            partnerId={data.partner.id}
          />
        )}
      </div>

      <UiTabs
        inverse
        activeKey={currentTab}
        onChange={(key) => setCurrentTab(key as TabsKeys)}
        items={tabs}
      />
    </div>
  );
};
