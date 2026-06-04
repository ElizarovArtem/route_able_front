import React from 'react';

import { CoachOffers } from '@/c.widgets/coachBilling/ui/CoachOffers/CoachOffers.tsx';
import { Connections, UserInfo } from '@/c.widgets/user';
import { Lessons } from '@/c.widgets/user/ui/Lessons/Lessons.tsx';
import { LessonSlots } from '@/c.widgets/user/ui/LessonSlots/LessonSlots.tsx';
import { Roles } from '@/e.entities/user';
import { UiFlex } from '@/f.shared/ui';

import styles from './CoachTab.module.scss';

export const CoachTab = () => {
  return (
    <UiFlex direction="column" gap="m">
      <UserInfo />
      <div className={styles.grid}>
        <LessonSlots />
        <CoachOffers />
        <Connections connectionsType="clients" />
        <Lessons forRole={Roles.Coach} />
      </div>
    </UiFlex>
  );
};
