import { type AxiosResponse } from 'axios';
import type { StateCreator } from 'zustand';

import type { TAuthStore } from '@/types/auth.ts';
import type { TRootStore } from '@/types/store.ts';
import type { TUser } from '@/types/user.ts';
import { api } from '@/utils/api.ts';

export const createAuthSlice: StateCreator<TRootStore, [], [], TAuthStore> = (
  setState,
  getState,
) => ({
  isAuthModalOpen: false,
  isInitialized: false,

  setIsAuthModalOpen: (isAuthModalOpen) => {
    setState({ isAuthModalOpen });
  },

  requestCode: async (phone) => {
    await api.post('/auth/request-code', { phone }, { withCredentials: true });
  },

  login: async (code: string, phone) => {
    const user = await api.post<
      { phone: string; code: string },
      AxiosResponse<{ user: TUser }>
    >(
      '/auth/login',
      {
        phone,
        code,
      },
      { withCredentials: true },
    );

    getState().setUser(user.data.user);
  },

  logout: async () => {
    await api.delete('/auth/logout', { withCredentials: true });
    setState({ user: null });
  },

  checkAuth: async () => {
    try {
      const response = await api.post('/auth/check-auth', {
        withCredentials: true,
      });

      getState().setUser(response.data.user);
    } catch {
      setState({ isInitialized: true });
    }
  },
});

export const authSelector = (store: TRootStore) => ({
  isAuthModalOpen: store.isAuthModalOpen,
  isInitialized: store.isInitialized,
  setIsAuthModalOpen: store.setIsAuthModalOpen,
  requestCode: store.requestCode,
  login: store.login,
  logout: store.logout,
  checkAuth: store.checkAuth,
});
