import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import React from 'react';

import { store } from '@/a.app/store/store.ts';

export const Route = createFileRoute('/_private')({
  component: RouteComponent,
  beforeLoad: () => {
    if (!store.getState().isInitialized) {
      return;
    }

    if (!store.getState().user) {
      throw redirect({
        to: '/',
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
