import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import React from 'react';

import { Layout } from '@/components/common/Layout/Layout.tsx';
import { AuthModal } from '@/components/widjets/AuthModal/AuthModal.tsx';
import { Header } from '@/components/widjets/Header/Header.tsx';

export const Route = createRootRoute({
  component: () => (
    <>
      <Layout>
        <Header />
        <Outlet />
      </Layout>
      <TanStackRouterDevtools />
      <AuthModal />
    </>
  ),
});
