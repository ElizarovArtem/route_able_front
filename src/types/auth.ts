import type { Roles } from '@/constants/user.ts';

type TAuthState = {
  isAuthModalOpen: boolean;
};

type TAuthActions = {
  getCode: (phone: string, role: Roles) => Promise<void>;
  login: (code: string, phone: string) => Promise<void>;
  setIsAuthModalOpen: (isAuthModalOpen: boolean) => void;
};

export type TAuthStore = TAuthState & TAuthActions;
