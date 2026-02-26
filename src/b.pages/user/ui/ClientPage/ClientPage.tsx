import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo } from 'react';

import { VideoLessonFromCoach } from '@/c.widgets/lessons';
import {
  Chat,
  MealPlanFromCoach,
  WorkoutPlanFromCoach,
} from '@/c.widgets/user';
import { FatSummary } from '@/e.entities/meal';
import { useGetRelation } from '@/e.entities/user/api';
import { CoachOrClientTabsKeys } from '@/e.entities/user/model/user.constants';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';
import { UiAvatar, UiCard, UiFlex, UiTabs, UiTypography } from '@/f.shared/ui';

import styles from './ClientPage.module.scss';

export const ClientPage = () => {
  const { tab: currentTab } = useSearch({
    from: '/_private/client/$clientId',
  });

  const clientId = useParams({
    from: '/_private/client/$clientId',
    select: (params) => params.clientId,
  });

  const navigate = useNavigate({ from: '/client/$clientId' });
  const { data } = useGetRelation(clientId, formatDateForServer(new Date()));

  const tabs = useMemo((): TabsProps['items'] => {
    return [
      {
        key: CoachOrClientTabsKeys.mealPlan,
        label: 'План питания',
        children: <MealPlanFromCoach relationId={data?.relation?.id} />,
      },
      {
        key: CoachOrClientTabsKeys.workoutsPlan,
        label: 'План тренировок',
        children: (
          <WorkoutPlanFromCoach
            relationId={data?.relation?.id}
            meRole={data?.meRole}
          />
        ),
      },
      {
        key: CoachOrClientTabsKeys.chat,
        label: 'Чат',
        children: (
          <Chat partnerId={clientId} chatId={data?.chat?.id || ''} fromCoach />
        ),
      },
      {
        key: CoachOrClientTabsKeys.videoChat,
        label: 'Видеосвязь',
        children: <VideoLessonFromCoach relationId={data?.relation?.id} />,
        disabled: !data?.relation?.isActive || false,
      },
    ];
  }, [clientId, data]);

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
        onChange={(key) => onTabChange(key as CoachOrClientTabsKeys)}
        items={tabs}
      />
    </UiFlex>
  );
};
