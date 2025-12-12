import React from 'react';

import { Calendar } from '@/c.widgets/day';
import { MealsInfo } from '@/c.widgets/meal';
import { Connections, UserInfo } from '@/c.widgets/user';
import { Lessons } from '@/c.widgets/user/ui/Lessons/Lessons.tsx';
import { LessonSlots } from '@/c.widgets/user/ui/LessonSlots/LessonSlots.tsx';
import { Roles, userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import { UiFlex } from '@/f.shared/ui';

import styles from './LkPage.module.scss';

export const LkPage = () => {
  const { user } = useSelector(userSelector);

  const isMobile = useMobile();

  return (
    <>
      <Calendar />
      <div className={styles.mainContentWrapper}>
        <UserInfo />
        <UiFlex
          className={styles.flexBlock}
          direction={isMobile ? 'column' : 'row'}
          gap={isMobile ? 's' : 'm'}
        >
          <MealsInfo />
          <Connections />
        </UiFlex>
        {user?.roles.includes(Roles.Coach) && (
          <UiFlex
            className={styles.flexBlock}
            direction={isMobile ? 'column' : 'row'}
            gap={isMobile ? 's' : 'm'}
          >
            <Lessons />
            <LessonSlots />
          </UiFlex>
        )}
      </div>
    </>
  );
};
