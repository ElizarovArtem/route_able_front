import { createFileRoute } from '@tanstack/react-router';

import { LkPage } from '@/pages/LkPage/LkPage.tsx';

export const Route = createFileRoute('/_private/lk')({
  component: LkPage,
});
