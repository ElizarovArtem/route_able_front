import axios from 'axios';
import type { StateCreator } from 'zustand';

import type { TAuthStore } from '@/types/auth.ts';
import type { TRootStore } from '@/types/store.ts';

export const createAuthSlice: StateCreator<TRootStore, [], [], TAuthStore> = (
  setState,
  getState,
) => ({
  isAuthModalOpen: false,

  setIsAuthModalOpen: (isAuthModalOpen) => {
    setState({ isAuthModalOpen });
  },

  getCode: async (phone, role) => {
    const user = await axios.get(`http://localhost:3005/users?phone=${phone}`);
    if (!user.data.length) {
      await axios.post(`http://localhost:3005/users`, {
        id: Math.random().toString(36).substr(2, 10),
        phone,
        role,
      });
    }
  },

  login: async (code: string, phone) => {
    const codeFromBase = await axios.get(
      `http://localhost:3005/codes?code=${code}`,
    );

    if (codeFromBase.data.length) {
      getState().getUser(phone);
    }
  },
});

export const authSelector = (store: TRootStore) => ({
  isAuthModalOpen: store.isAuthModalOpen,
  setIsAuthModalOpen: store.setIsAuthModalOpen,
  getCode: store.getCode,
  login: store.login,
});
