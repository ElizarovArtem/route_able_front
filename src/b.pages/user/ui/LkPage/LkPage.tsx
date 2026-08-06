import { useSearch } from '@tanstack/react-router';
import React from 'react';

import { AdminTab } from '@/b.pages/user/ui/LkPage/components/AdminTab.tsx';
import { ClientTab } from '@/b.pages/user/ui/LkPage/components/ClientTab/ClientTab.tsx';
import { CoachTab } from '@/b.pages/user/ui/LkPage/components/CoachTab/CoachTab.tsx';
import { Roles, userSelector } from '@/e.entities/user';
import { LkContentTypeTabKeys } from '@/e.entities/user/model/user.enums.ts';
import { useSelector } from '@/f.shared/lib';

export const LkPage = () => {
  const { tab: currentTab } = useSearch({
    from: '/_private/lk',
  });

  const { user } = useSelector(userSelector);

  if (
    currentTab === LkContentTypeTabKeys.coach &&
    user?.roles.includes(Roles.Coach)
  ) {
    return <CoachTab />;
  }

  if (
    currentTab === LkContentTypeTabKeys.admin &&
    user?.roles.includes(Roles.Admin)
  ) {
    return <AdminTab />;
  }

  return <ClientTab />;
};
