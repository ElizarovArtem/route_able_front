import { Store } from '@tanstack/store';

import type { TUserStore } from '@/types/user.ts';

export const usersStore = new Store<TUserStore>({
  user: null,
});
