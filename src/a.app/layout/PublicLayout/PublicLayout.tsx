import React, { type PropsWithChildren } from 'react';

import { Header } from '@/a.app/layout/Header';
import { Layout } from '@/a.app/layout/Layout';

export const PublicLayout = ({ children }: PropsWithChildren) => (
  <Layout>
    <Header />
    {children}
  </Layout>
);
