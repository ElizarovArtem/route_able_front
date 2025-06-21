import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createAuthSlice } from '@/store/authStore.ts';
import { createUserSlice } from '@/store/usersStore.ts';
import type { TRootStore } from '@/types/store.ts';

export const rootStore = create<TRootStore>()(
  devtools(
    (set, get, store) => ({
      ...createAuthSlice(set, get, store),
      ...createUserSlice(set, get, store),
    }),
    { name: 'Zustand Devtools' },
  ),
);
