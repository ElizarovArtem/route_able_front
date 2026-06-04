import React from 'react';

import { Calendar } from '@/c.widgets/day';
import { MealsInfo } from '@/c.widgets/meal';
import { Connections, UserInfo } from '@/c.widgets/user';
import { Lessons } from '@/c.widgets/user/ui/Lessons/Lessons.tsx';
import { Roles } from '@/e.entities/user';
import { UiFlex } from '@/f.shared/ui';

import styles from './ClientTab.module.scss';

export const ClientTab = () => {
  return (
    <UiFlex direction="column" gap="m">
      <UserInfo />
      <Calendar />
      <MealsInfo />
      <div className={styles.grid}>
        <Lessons forRole={Roles.Client} />
        <Connections connectionsType="coaches" />
      </div>
    </UiFlex>
  );
};
