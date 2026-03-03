import React from 'react';

import styles from '@/b.pages/user/ui/LkPage/LkPage.module.scss';
import { Connections } from '@/c.widgets/user';
import { Lessons } from '@/c.widgets/user/ui/Lessons/Lessons.tsx';
import { LessonSlots } from '@/c.widgets/user/ui/LessonSlots/LessonSlots.tsx';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import { UiFlex } from '@/f.shared/ui';

export const CoachTab = () => {
  const isMobile = useMobile();

  return (
    <UiFlex direction="column">
      <UiFlex
        className={styles.flexBlock}
        direction={isMobile ? 'column' : 'row'}
        gap="s"
      >
        <Lessons />
        <LessonSlots />
      </UiFlex>
      <Connections connectionsType="clients" />
    </UiFlex>
  );
};
