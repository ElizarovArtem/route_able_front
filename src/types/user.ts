import { Roles } from '@/constants/user.ts';

export type TUserStore = {
  user: { name: string; email: string; phone: string; role: Roles } | null;
};
