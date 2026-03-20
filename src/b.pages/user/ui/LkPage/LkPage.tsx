import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo, useState } from 'react';

import { AdminTab } from '@/b.pages/user/ui/LkPage/components/AdminTab.tsx';
import { ClientTab } from '@/b.pages/user/ui/LkPage/components/ClientTab/ClientTab.tsx';
import { CoachTab } from '@/b.pages/user/ui/LkPage/components/CoachTab/CoachTab.tsx';
import { Calendar } from '@/c.widgets/day';
import { MealsInfo } from '@/c.widgets/meal';
import { Connections } from '@/c.widgets/user';
import { Roles, userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import { UiFlex, UiTabs } from '@/f.shared/ui';

import styles from './LkPage.module.scss';

enum LkContentType {
  user = 'user',
  coach = 'coach',
  admin = 'admin',
}

export const LkPage = () => {
  const [contentType, setContentType] = useState<LkContentType>(
    LkContentType.user,
  );

  const { user } = useSelector(userSelector);

  const isMobile = useMobile();

  const items = useMemo((): TabsProps['items'] => {
    switch (contentType) {
      case LkContentType.user: {
        return [
          {
            key: LkContentType.user,
            label: 'Клиентская',
            children: <ClientTab />,
          },
          ...(user?.roles.includes(Roles.Coach)
            ? [
                {
                  key: LkContentType.coach,
                  label: 'Тренерская',
                  disabled: !user?.roles.includes(Roles.Coach),
                  children: <CoachTab />,
                },
              ]
            : []),

          ...(user?.roles.includes(Roles.Admin)
            ? [
                {
                  key: LkContentType.admin,
                  label: 'Админская',
                  disabled: !user?.roles.includes(Roles.Coach),
                  children: <AdminTab />,
                },
              ]
            : []),
        ];
      }
    }
  }, [user]);

  return (
    <UiFlex direction="column">
      {/*<Calendar />*/}

      {(user?.roles.length || 0) > 1 ? (
        <UiTabs
          activeKey={contentType}
          onChange={(key) => setContentType(key as LkContentType)}
          items={items}
        />
      ) : (
        <ClientTab />
      )}
    </UiFlex>
  );
};
