import React from 'react';

import { CoachOffers } from '@/c.widgets/coachBilling/ui/CoachOffers/CoachOffers.tsx';
import { Calendar } from '@/c.widgets/day';
import { Connections, UserInfo } from '@/c.widgets/user';
import { Lessons } from '@/c.widgets/user/ui/Lessons/Lessons.tsx';
import { LessonSlots } from '@/c.widgets/user/ui/LessonSlots/LessonSlots.tsx';
import { Roles } from '@/e.entities/user';
import { UiFlex } from '@/f.shared/ui';

import styles from './CoachTab.module.scss';

export const CoachTab = () => {
  return (
    <UiFlex direction="column" gap="s">
      <Calendar />

      <UiFlex gap="s">
        <UserInfo />
        <UiFlex
          flex={1}
          gap="s"
          className={styles.stretchRow}
          childrenEqualLength
        >
          <LessonSlots className={styles.stretchCard} />
          <CoachOffers className={styles.stretchCard} />
        </UiFlex>
      </UiFlex>
      <UiFlex childrenEqualLength gap="s">
        <Connections connectionsType="clients" />
        <Lessons forRole={Roles.Coach} />
      </UiFlex>
    </UiFlex>
  );
};
