import React from 'react';

import { Calendar } from '@/pages/LkPage/components/Calendar/Calendar.tsx';
import { MealsInfo } from '@/pages/LkPage/components/MealsInfo/MealsInfo.tsx';
import { UserInfo } from '@/pages/LkPage/components/UserInfo/UserInfo.tsx';

import styles from './LkPage.module.scss';

export const LkPage = () => {
  return (
    <div>
      <Calendar />
      <div className={styles.mainContentWrapper}>
        <MealsInfo />
        <UserInfo />
      </div>
    </div>
  );
};
