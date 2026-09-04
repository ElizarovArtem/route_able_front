import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import React from 'react';

import { RootLayout } from '@/a.app/layout/RootLayout';
import { CreateFeedbackModal } from '@/d.features/feedback/ui/CreateFeedbackModal/CreateFeedbackModal.tsx';
import { AuthModal, CheckAuth, CheckMySubscription } from '@/d.features/user';
import { UiTypography } from '@/f.shared/ui';

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
          <RootLayout />
        )}

        <CheckAuth />
        <CheckMySubscription />
        <AuthModal />
        <CreateFeedbackModal />

        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  ),
});
