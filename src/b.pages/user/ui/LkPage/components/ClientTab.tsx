import React from 'react';

import styles from '@/b.pages/user/ui/LkPage/LkPage.module.scss';
import { MealsInfo } from '@/c.widgets/meal';
import { Connections } from '@/c.widgets/user';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import { UiFlex } from '@/f.shared/ui';

export const ClientTab = () => {
  const isMobile = useMobile();

  return (
    <UiFlex
      className={styles.flexBlock}
      direction={isMobile ? 'column' : 'row'}
      gap="s"
    >
      <MealsInfo />
      <Connections connectionsType="coaches" />
    </UiFlex>
  );
};
