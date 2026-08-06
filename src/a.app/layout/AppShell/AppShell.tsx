import { useRouterState } from '@tanstack/react-router';
import React, { type PropsWithChildren, useEffect, useState } from 'react';

import { Header } from '@/a.app/layout/Header';
import { AppSidebar } from '@/c.widgets/navigation';

import styles from './AppShell.module.scss';

export const AppShell = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSidebarOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isSidebarOpen]);

  return (
    <div className={styles.shell}>
      <Header
        showNavigation={false}
        onSidebarToggle={() => setIsSidebarOpen((current) => !current)}
      />

      <div className={styles.body}>
        <AppSidebar
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};
