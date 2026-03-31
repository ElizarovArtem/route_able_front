import React from 'react';

import { Calendar } from '@/c.widgets/day';
import { MealsInfo } from '@/c.widgets/meal';
import { Connections, UserInfo } from '@/c.widgets/user';
import { Lessons } from '@/c.widgets/user/ui/Lessons/Lessons.tsx';
import { Roles } from '@/e.entities/user';
import { UiFlex } from '@/f.shared/ui';

export const ClientTab = () => {
  return (
    <UiFlex direction="column" gap="s">
      <Calendar />

      <UiFlex gap="s">
        <UserInfo />
        <UiFlex direction="column" childrenEqualLength flex={1} gap="s">
          <MealsInfo />
        </UiFlex>
      </UiFlex>
      <UiFlex gap="s" childrenEqualLength>
        <Lessons forRole={Roles.Client} />
        <Connections connectionsType="coaches" />
      </UiFlex>
    </UiFlex>
  );
};
