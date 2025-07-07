type TAuthState = {
  isAuthModalOpen: boolean;
  isInitialized: boolean;
};

type TAuthActions = {
  requestCode: (phone: string) => Promise<void>;
  login: (code: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
  setIsAuthModalOpen: (isAuthModalOpen: boolean) => void;
  checkAuth: () => Promise<void>;
};

export type TAuthStore = TAuthState & TAuthActions;
