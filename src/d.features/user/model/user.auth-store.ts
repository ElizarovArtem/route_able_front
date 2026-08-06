import { type AxiosResponse } from 'axios';
import type { StateCreator } from 'zustand';

import type { TRootStore } from '@/a.app/store/store.ts';
import type { User } from '@/e.entities/user';
import { api } from '@/f.shared/api';
import { connectSocket, disconnectSocket } from '@/f.shared/api/socket.ts';

type TAuthState = {
  isAuthModalOpen: boolean;
  isInitialized: boolean;
};

type TAuthActions = {
  requestCodeByTelegram: (phone: string) => Promise<void>;
  requestCodeByEmail: (phone: string) => Promise<void>;
  login: (data: {
    phone?: string;
    email?: string;
    code: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  setIsAuthModalOpen: (isAuthModalOpen: boolean) => void;
  checkAuth: () => Promise<void>;
};

export type TAuthStore = TAuthState & TAuthActions;

//

export const createAuthSlice: StateCreator<TRootStore, [], [], TAuthStore> = (
  setState,
  getState,
) => ({
  isAuthModalOpen: false,
  isInitialized: false,

  setIsAuthModalOpen: (isAuthModalOpen) => {
    setState({ isAuthModalOpen });
  },

  requestCodeByTelegram: async (phone) => {
    await api.post(
      '/auth/request-code-telegram',
      { phone },
      { withCredentials: true },
    );
  },

  requestCodeByEmail: async (email) => {
    await api.post(
      '/auth/request-code-email',
      { email },
      { withCredentials: true },
    );
  },

  login: async (data) => {
    const loginUrl = data.email ? '/auth/login-by-email' : '/auth/login';

    const user = await api.post<
      { phone?: string; email?: string; code: string },
      AxiosResponse<{ user: User }>
    >(loginUrl, data, { withCredentials: true });

    connectSocket();

    getState().setUser(user.data.user);
  },

  logout: async () => {
    await api.delete('/auth/logout', { withCredentials: true });
    setState({ user: null });
    disconnectSocket();
  },

  checkAuth: async () => {
    try {
      const response = await api.post('/auth/check-auth', {
        withCredentials: true,
      });

      connectSocket();

      getState().setUser(response.data.user);
    } catch {
      setState({ user: null });
    } finally {
      setState({ isInitialized: true });
    }
  },
});

export const authSelector = (store: TRootStore) => ({
  isAuthModalOpen: store.isAuthModalOpen,
  isInitialized: store.isInitialized,
  setIsAuthModalOpen: store.setIsAuthModalOpen,
  requestCodeByTelegram: store.requestCodeByTelegram,
  requestCodeByEmail: store.requestCodeByEmail,
  login: store.login,
  logout: store.logout,
  checkAuth: store.checkAuth,
});
