import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import React from 'react';

import { Header } from '@/a.app/layout/Header';
import { AuthModal, CheckAuth } from '@/d.features/user';
import { UiTypography } from '@/f.shared/ui';

import { Layout } from '../layout/Layout';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        {import.meta.env.VITE_NODE_ENV === 'production' ? (
          <div className="prod-mock">
            <UiTypography bold size="large">
              Здесь будет <span style={{ color: '#22C8A7' }}>Route Able</span> -
              приложение для лучшего тренировочного опыта в тренажерном зале
            </UiTypography>
          </div>
        ) : (
          <Layout>
            <Header />
            <Outlet />
          </Layout>
        )}

        <CheckAuth />
        <AuthModal />

        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  ),
});
