import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import React from 'react';

import { CheckAuth } from '@/components/common/CheckAuth/CheckAuth.tsx';
import { Layout } from '@/components/common/Layout/Layout.tsx';
import { AuthModal } from '@/components/widjets/AuthModal/AuthModal.tsx';
import { Header } from '@/components/widjets/Header/Header.tsx';

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
