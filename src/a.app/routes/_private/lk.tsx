import { createFileRoute } from '@tanstack/react-router';

import { LkPage } from '@/b.pages/user/ui';

export const Route = createFileRoute('/_private/lk')({
  component: LkPage,
});
