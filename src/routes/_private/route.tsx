import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import React from 'react';

import { rootStore } from '@/store/rootStore.ts';

export const Route = createFileRoute('/_private')({
  component: RouteComponent,
  beforeLoad: () => {
    if (!rootStore.getState().isInitialized) {
      return;
    }

    if (!rootStore.getState().user) {
      throw redirect({
        to: '/',
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
