import { useParams } from '@tanstack/react-router';
import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo, useState } from 'react';

import { Chat } from '@/c.widgets/user';
import { PaySubscription } from '@/d.features/user/ui/PaySubscription/PaySubscription.tsx';
import { useGetRelation } from '@/e.entities/user/api/queries/useGetRelation.ts';
import { UiTabs } from '@/f.shared/ui';
import { UiAvatar } from '@/f.shared/ui/UiAvatar/UiAvatar.tsx';

import styles from './CoachPage.module.scss';

enum TabsKeys {
  chat = 'chat',
  workoutsPlan = 'workoutsPlan',
  mealPlan = 'mealPlan',
}

export const CoachPage = () => {
  const [currentTab, setCurrentTab] = useState<TabsKeys>(TabsKeys.chat);
  const coachId = useParams({
    from: '/_private/coach/$coachId',
    select: (params) => params.coachId,
  });

  const { data } = useGetRelation(coachId);

  const isActiveSubscription = data?.relation?.isActive || false;

  const tabs = useMemo((): TabsProps['items'] => {
    return [
      {
        key: TabsKeys.chat,
        label: 'Чат',
        children: <Chat partnerId={coachId} />,
      },
      {
        key: TabsKeys.mealPlan,
        label: 'План питания',
        children: <></>,
        disabled: !isActiveSubscription,
      },
      {
        key: TabsKeys.workoutsPlan,
        label: 'План тренировок',
        children: <></>,
        disabled: !isActiveSubscription,
      },
    ];
  }, [coachId, isActiveSubscription]);

  return (
    <div className={styles.coachPageWrapper}>
      <div className={styles.about}>
        <UiAvatar width={200} height={200} src={data?.partner.avatar || ''} />
        <div className={styles.aboutInfo}>
          <div>{data?.partner.name}</div>
          <div>{data?.partner.about}</div>
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
