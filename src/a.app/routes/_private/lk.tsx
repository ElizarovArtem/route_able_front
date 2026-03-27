import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { LkPage } from '@/b.pages/user/ui';
import { LkContentTypeTabKeys } from '@/e.entities/user/model/user.enums.ts';

export const Route = createFileRoute('/_private/lk')({
  component: LkPage,
  validateSearch: z.object({
    tab: z.nativeEnum(LkContentTypeTabKeys).default(LkContentTypeTabKeys.user),
  }),
});
