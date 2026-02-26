import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo } from 'react';

import { VideoLessonFromClient } from '@/c.widgets/lessons';
import {
  Chat,
  MealPlanFromClient,
  WorkoutPlanFromClient,
} from '@/c.widgets/user';
import { PaySubscription } from '@/d.features/user';
import { useGetRelation } from '@/e.entities/user';
import { CoachOrClientTabsKeys } from '@/e.entities/user/model/user.constants.tsx';
import { UiAvatar, UiFlex, UiTabs, UiTypography } from '@/f.shared/ui';

import styles from './CoachPage.module.scss';

export const CoachPage = () => {
  const { tab: currentTab } = useSearch({
    from: '/_private/client/$clientId',
  });

  const coachId = useParams({
    from: '/_private/coach/$coachId',
    select: (params) => params.coachId,
  });

  const { data } = useGetRelation(coachId);
  const navigate = useNavigate({ from: '/coach/$coachId' });

  const tabs = useMemo((): TabsProps['items'] => {
    return [
      {
        key: CoachOrClientTabsKeys.mealPlan,
        label: 'План питания',
        children: <MealPlanFromClient relationId={data?.relation?.id} />,
        disabled: !data?.relation?.isActive || false,
      },
      {
        key: CoachOrClientTabsKeys.workoutsPlan,
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
        key: CoachOrClientTabsKeys.chat,
        label: 'Чат',
        children: <Chat partnerId={coachId} chatId={data?.chat?.id} />,
      },
      {
        key: CoachOrClientTabsKeys.videoChat,
        label: 'Видеосвязь',
        children: <VideoLessonFromClient relationId={data?.relation?.id} />,
        disabled: !data?.relation?.isActive || false,
      },
    ];
  }, [coachId, data]);

  const onTabChange = (tab: CoachOrClientTabsKeys) => {
    navigate({
      search: (prev) => ({
        ...prev,
        tab,
      }),
    });
  };

  return (
    <UiFlex direction="column">
      <UiFlex className={styles.about}>
        <UiAvatar width={200} src={data?.partner.avatar || ''} />
        <UiFlex direction="column" gap="s">
          <UiTypography bold>{data?.partner.name}</UiTypography>
          <UiTypography>{data?.partner.about}</UiTypography>
        </UiFlex>
        {!data?.relation?.isActive && data?.relation?.id && (
          <PaySubscription
            linkId={data.relation.id}
            partnerId={data.partner.id}
          />
        )}
      </UiFlex>

      <UiTabs
        inverse
        activeKey={currentTab}
        onChange={(key) => onTabChange(key as CoachOrClientTabsKeys)}
        items={tabs}
      />
    </UiFlex>
  );
};
