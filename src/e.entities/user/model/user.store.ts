import axios from 'axios';
import type { StateCreator } from 'zustand/index';

import type { TRootStore } from '@/a.app/store/store.ts';
import { localStorage } from '@/f.shared/lib/localStorage.ts';

import type { User } from './user.model.ts';

// Types

export type TUserState = {
  user: User | null;
};

export type TUserActions = {
  getUser: (phone: string) => Promise<void>;
  setUser: (user: User) => void;
};

export type TUserStore = TUserState & TUserActions;

//

export const createUserSlice: StateCreator<TRootStore, [], [], TUserStore> = (
  setState,
) => ({
  user: null,

  setUser: async (user) => {
    setState({ user });
  },

  getUser: async (phone) => {
    const user = await axios.get(`http://localhost:3005/users?phone=${phone}`);

    localStorage.set('user', JSON.stringify(user.data[0]));

    setState({ user: user.data[0] });
  },
});

export const userSelector = (store: TRootStore) => ({
  user: store.user,
  setUser: store.setUser,
});
