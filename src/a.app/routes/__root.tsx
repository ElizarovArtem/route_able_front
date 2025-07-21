import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import React from 'react';

import { Header } from '@/a.app/layout/Header';
import { AuthModal, CheckAuth } from '@/d.features/user';

import { Layout } from '../layout/Layout';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Header />
          <Outlet />
        </Layout>

        <CheckAuth />
        <AuthModal />
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </>
  ),
});
