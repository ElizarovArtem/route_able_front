import React from 'react';

import { Calendar } from '@/c.widgets/day';
import { MealsInfo } from '@/c.widgets/meal';
import { Connections, UserInfo } from '@/c.widgets/user';

import styles from './LkPage.module.scss';

export const LkPage = () => {
  return (
    <div>
      <Calendar />
      <div className={styles.mainContentWrapper}>
        <MealsInfo />
        <UserInfo />
        <Connections />
      </div>
    </div>
  );
};
