import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo, useState } from 'react';

import { Calendar } from '@/c.widgets/day';
import { MealsInfo } from '@/c.widgets/meal';
import { Connections, UserInfo } from '@/c.widgets/user';
import { Lessons } from '@/c.widgets/user/ui/Lessons/Lessons.tsx';
import { LessonSlots } from '@/c.widgets/user/ui/LessonSlots/LessonSlots.tsx';
import { Roles, userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import { UiFlex, UiTabs } from '@/f.shared/ui';

import styles from './LkPage.module.scss';

enum LkContentType {
  user = 'user',
  coach = 'coach',
}

export const LkPage = () => {
  const [contentType, setContentType] = useState<LkContentType>(
    LkContentType.user,
  );

  const { user } = useSelector(userSelector);

  const isMobile = useMobile();

  const lkContent = useMemo((): TabsProps['items'] => {
    switch (contentType) {
      case LkContentType.user: {
        return [
          {
            key: LkContentType.user,
            label: 'Мои данные',
            children: (
              <>
                <UiFlex
                  className={styles.flexBlock}
                  direction={isMobile ? 'column' : 'row'}
                  gap="s"
                >
                  <MealsInfo />
                  <Connections connectionsType="coaches" />
                </UiFlex>
              </>
            ),
          },
          {
            key: LkContentType.coach,
            label: 'Тренерская',
            disabled: !user?.roles.includes(Roles.Coach),
            children: (
              <UiFlex direction="column">
                <UiFlex
                  className={styles.flexBlock}
                  direction={isMobile ? 'column' : 'row'}
                  gap="s"
                >
                  <Lessons />
                  <LessonSlots />
                </UiFlex>
                <Connections connectionsType="clients" />
              </UiFlex>
            ),
          },
        ];
      }
    }
  }, [user]);

  return (
    <UiFlex direction="column">
      <Calendar />

      <UserInfo />

      {user?.roles.includes(Roles.Coach) ? (
        <UiTabs
          activeKey={contentType}
          onChange={(key) => setContentType(key as LkContentType)}
          items={lkContent}
        />
      ) : (
        <UiFlex
          className={styles.flexBlock}
          direction={isMobile ? 'column' : 'row'}
          gap="s"
        >
          <MealsInfo />
          <Connections connectionsType="coaches" />
        </UiFlex>
      )}
    </UiFlex>
  );
};
