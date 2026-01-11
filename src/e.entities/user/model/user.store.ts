import type { StateCreator } from 'zustand/index';

import type { TRootStore } from '@/a.app/store/store.ts';
import { api } from '@/f.shared/api';

import type { User } from './user.types.ts';

// Types

export type TUserState = {
  user: User | null;
};

export type TUserActions = {
  getUser: (phone: string) => Promise<void>;
  setUser: (user: User) => void;
};

export type TUserStore = TUserState & TUserActions;

export const createUserSlice: StateCreator<TRootStore, [], [], TUserStore> = (
  setState,
) => ({
  user: null,

  setUser: async (user) => {
    setState({ user });
  },

  getUser: async (id: string) => {
    const user = await api.get(`user/byId/${id}`);

    setState({ user: user.data });
  },
});

export const userSelector = (store: TRootStore) => ({
  user: store.user,
  setUser: store.setUser,
  getUser: store.getUser,
});
