import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

import { store } from '@/a.app/store/store.ts';
import { CoachPage } from '@/b.pages/user/ui';
import { CoachOrClientTabsKeys } from '@/e.entities/user/model/user.enums.ts';

export const Route = createFileRoute('/_private/coach/$coachId')({
  component: CoachPage,
  beforeLoad: ({ params }) => {
    if (store.getState().user?.id === params.coachId) {
      throw redirect({
        to: '/',
      });
    }
  },
  validateSearch: z.object({
    tab: z
      .nativeEnum(CoachOrClientTabsKeys)
      .default(CoachOrClientTabsKeys.servicesAndSlots),
  }),
});
