import axios from 'axios';
import type { StateCreator } from 'zustand/index';

import type { TRootStore } from '@/types/store.ts';
import type { TUserStore } from '@/types/user.ts';
import { localStorage } from '@/utils/localStorage.ts';

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
});
