import axios from 'axios';
import type { StateCreator } from 'zustand';

import { Roles } from '@/constants/user.ts';
import type { TAuthStore } from '@/types/auth.ts';
import type { TRootStore } from '@/types/store.ts';
import type { TUser } from '@/types/user.ts';
import { localStorage } from '@/utils/localStorage.ts';

export const createAuthSlice: StateCreator<TRootStore, [], [], TAuthStore> = (
  setState,
  getState,
) => ({
  isAuthModalOpen: false,
  isInitialized: false,

  setIsAuthModalOpen: (isAuthModalOpen) => {
    setState({ isAuthModalOpen });
  },

  getCode: async (phone) => {
    const user = (await axios.get(`http://localhost:3005/users?phone=${phone}`))
      .data[0];
    console.log(user);
    if (!user) {
      await axios.post(`http://localhost:3005/users`, {
        id: Math.random().toString(36).substr(2, 10),
        phone,
        roles: [Roles.Trainee],
        loggedIn: Date.now(),
      });
    } else {
      await axios.patch(`http://localhost:3005/users/${user.id}`, {
        loggedIn: Date.now(),
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

  logout: () => {
    localStorage.delete('user');
    setState({ user: null });
  },

  checkAuth: async () => {
    const userFormStorage = localStorage.get('user');
    const user: TUser = userFormStorage ? JSON.parse(userFormStorage) : null;

    if (user && user.loggedIn + 86400 * 1000 - Date.now() > 0) {
      const newUser = { ...user, loggedIn: Date.now() };

      localStorage.set('user', JSON.stringify(newUser));
      getState().setUser(newUser);
    } else if (user) {
      localStorage.delete('user');
    }
    setState({ isInitialized: true });
  },
});

export const authSelector = (store: TRootStore) => ({
  isAuthModalOpen: store.isAuthModalOpen,
  isInitialized: store.isInitialized,
  setIsAuthModalOpen: store.setIsAuthModalOpen,
  getCode: store.getCode,
  login: store.login,
  logout: store.logout,
  checkAuth: store.checkAuth,
});
