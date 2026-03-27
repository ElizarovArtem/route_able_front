import { useNavigate, useSearch } from '@tanstack/react-router';
import type { TabsProps } from 'antd/es/tabs';
import React, { useMemo } from 'react';

import { AdminTab } from '@/b.pages/user/ui/LkPage/components/AdminTab.tsx';
import { ClientTab } from '@/b.pages/user/ui/LkPage/components/ClientTab/ClientTab.tsx';
import { CoachTab } from '@/b.pages/user/ui/LkPage/components/CoachTab/CoachTab.tsx';
import { Roles, userSelector } from '@/e.entities/user';
import { LkContentTypeTabKeys } from '@/e.entities/user/model/user.enums.ts';
import { useSelector } from '@/f.shared/lib';
import { UiFlex, UiTabs } from '@/f.shared/ui';

enum LkContentType {
  user = 'user',
  coach = 'coach',
  admin = 'admin',
}

export const LkPage = () => {
  const { tab: currentTab } = useSearch({
    from: '/_private/lk',
  });

  const { user } = useSelector(userSelector);
  const navigate = useNavigate({ from: '/lk' });

  const items = useMemo((): TabsProps['items'] => {
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
  }, [user]);

  const onTabChange = (tab: LkContentTypeTabKeys) => {
    navigate({
      search: (prev) => ({
        ...prev,
        tab,
      }),
    });
  };

  return (
    <UiFlex direction="column">
      {/*<Calendar />*/}

      {(user?.roles.length || 0) > 1 ? (
        <UiTabs
          activeKey={currentTab}
          onChange={(key) => onTabChange(key as LkContentTypeTabKeys)}
          items={items}
        />
      ) : (
        <ClientTab />
      )}
    </UiFlex>
  );
};
