import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import React, { useEffect } from 'react';

import { AppShell } from '@/a.app/layout/AppShell';
import { PublicLayout } from '@/a.app/layout/PublicLayout';
import { authSelector } from '@/d.features/user';
import { userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { UiLoaderContainer } from '@/f.shared/ui';

import styles from './RootLayout.module.scss';

export const RootLayout = () => {
  const { isInitialized } = useSelector(authSelector);
  const { user } = useSelector(userSelector);
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const shouldRedirectToCabinet =
    isInitialized && Boolean(user) && pathname === '/';

  useEffect(() => {
    if (shouldRedirectToCabinet) {
      navigate({ to: '/lk', replace: true });
    }
  }, [navigate, shouldRedirectToCabinet]);

  if (!isInitialized || shouldRedirectToCabinet) {
    return (
      <div className={styles.loader}>
        <UiLoaderContainer isLoading>
          <div />
        </UiLoaderContainer>
      </div>
    );
  }

  const showAppShell = Boolean(user);

  return showAppShell ? (
    <AppShell>
      <Outlet />
    </AppShell>
  ) : (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};
