import { Roles } from '@/constants/user.ts';

export type TUserState = {
  user: TUser | null;
};

export type TUserActions = {
  getUser: (phone: string) => Promise<void>;
  setUser: (user: TUser) => void;
};

export type TUserStore = TUserState & TUserActions;

export type TUser = {
  name?: string;
  email?: string;
  note?: string;
  phone: string;
  role: Roles;
  id: string;
};
