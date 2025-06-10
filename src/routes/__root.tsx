import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import React from 'react';

import { Layout } from '@/components/Layout/Layout.tsx';
import { Header } from '@/widjets/common/Header/Header.tsx';

export const Route = createRootRoute({
  component: () => (
    <>
      <Layout>
        <Header />
        <Outlet />
      </Layout>
      <TanStackRouterDevtools />
    </>
  ),
});
