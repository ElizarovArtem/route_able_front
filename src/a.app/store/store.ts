import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createAuthSlice, type TAuthStore } from '@/d.features/user';
import {
  createFeedbackSlice,
  type TFeedbackStore,
} from '@/e.entities/feedback/model/feedback.store.ts';
import { createUserSlice, type TUserStore } from '@/e.entities/user';

export type TRootStore = TUserStore & TAuthStore & TFeedbackStore;

export const store = create<TRootStore>()(
  devtools(
    (set, get, store) => ({
      ...createAuthSlice(set, get, store),
      ...createUserSlice(set, get, store),
      ...createFeedbackSlice(set, get, store),
    }),
    { name: 'Zustand Devtools' },
  ),
);
