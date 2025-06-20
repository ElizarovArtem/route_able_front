import { Roles } from '@/constants/user.ts';

export type TUserState = {
  user: TUser | null;
};

export type TUserActions = {
  getUser: (phone: string) => Promise<void>;
};

export type TUserStore = TUserState & TUserActions;

export type TUser = {
  name?: string;
  email?: string;
  phone: string;
  role: Roles;
  id: string;
};
