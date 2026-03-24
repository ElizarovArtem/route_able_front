import React from 'react';

import { CoachOffers } from '@/c.widgets/coachBilling/ui/CoachOffers/CoachOffers.tsx';
import { Calendar } from '@/c.widgets/day';
import { Connections, UserInfo } from '@/c.widgets/user';
import { Lessons } from '@/c.widgets/user/ui/Lessons/Lessons.tsx';
import { LessonSlots } from '@/c.widgets/user/ui/LessonSlots/LessonSlots.tsx';

import styles from './CoachTab.module.scss';

export const CoachTab = () => {
  return (
    <div className={styles.coachTabGrid}>
      <div className={styles.profileGridItem}>
        <UserInfo />
      </div>
      <div className={styles.calendarGridItem}>
        <Calendar />
      </div>
      {/*<div className={styles.lessonsGridItem}>*/}
      {/*  <Lessons className={styles.item} />*/}
      {/*</div>*/}
      <div className={styles.lessonsSlotsGridItem}>
        <LessonSlots className={styles.item} />
      </div>
      <div className={styles.coachOffersGridItem}>
        <CoachOffers className={styles.item} />
      </div>
      <div className={styles.clientsGridItem}>
        <Connections connectionsType="clients" />
      </div>
    </div>
  );
};
