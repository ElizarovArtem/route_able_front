import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { ClientPage } from '@/b.pages/user/ui';

export const Route = createFileRoute('/_private/client/$clientId')({
  validateSearch: z.object({
    chatId: z.string().optional(),
  }),
  component: ClientPage,
});
