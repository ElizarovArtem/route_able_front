import axios from 'axios';
import type { StateCreator } from 'zustand/index';

import type { TRootStore } from '@/types/store.ts';
import type { TUserStore } from '@/types/user.ts';

export const createUserSlice: StateCreator<TUserStore> = (setState) => ({
  user: null,

  getUser: async (phone) => {
    const user = await axios.get(`http://localhost:3005/users?phone=${phone}`);

    setState({ user: user.data[0] });
  },
});
