import type { TAuthStore } from '@/types/auth.ts';
import type { TUserStore } from '@/types/user.ts';

export type TRootStore = TUserStore & TAuthStore;
