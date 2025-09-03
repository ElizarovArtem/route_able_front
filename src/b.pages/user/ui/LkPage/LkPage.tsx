import React from 'react';

import { Calendar } from '@/c.widgets/day';
import { MealsInfo } from '@/c.widgets/meal';
import { UserInfo } from '@/c.widgets/user';
import { Connections } from '@/c.widgets/user/ui';

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
