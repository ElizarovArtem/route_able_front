import React from 'react';

import { Calendar } from '@/c.widgets/day';
import { MealsInfo } from '@/c.widgets/meal';
import { Connections, UserInfo } from '@/c.widgets/user';

import styles from './ClientTab.module.scss';

export const ClientTab = () => {
  return (
    <div className={styles.coachTabGrid}>
      <div className={styles.profileGridItem}>
        <UserInfo />
      </div>
      <div className={styles.calendarGridItem}>
        <Calendar />
      </div>
      <div className={styles.mealsInfoGridItem}>
        <MealsInfo />
      </div>
      <div className={styles.connectionsGridItem}>
        <Connections connectionsType="coaches" />
      </div>
    </div>
  );
};
