import { createFileRoute } from '@tanstack/react-router';

import { ClientPage } from '@/b.pages/user/ui';

export const Route = createFileRoute('/_private/client/$clientId')({
  component: ClientPage,
});
