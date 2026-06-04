import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { ClientPage } from '@/b.pages/user/ui';
import { CoachOrClientTabsKeys } from '@/e.entities/user/model/user.enums.ts';

export const Route = createFileRoute('/_private/client/$clientId')({
  component: ClientPage,
  validateSearch: z.object({
    tab: z
      .nativeEnum(CoachOrClientTabsKeys)
      .default(CoachOrClientTabsKeys.mealPlan),
  }),
});
