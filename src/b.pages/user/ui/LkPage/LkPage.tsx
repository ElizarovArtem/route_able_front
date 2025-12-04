import React from 'react';

import { Calendar } from '@/c.widgets/day';
import { MealsInfo } from '@/c.widgets/meal';
import { Connections, UserInfo } from '@/c.widgets/user';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import { UiFlex } from '@/f.shared/ui';

import styles from './LkPage.module.scss';

export const LkPage = () => {
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
      </div>
    </>
  );
};
