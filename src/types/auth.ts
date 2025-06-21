type TAuthState = {
  isAuthModalOpen: boolean;
  isInitialized: boolean;
};

type TAuthActions = {
  getCode: (phone: string) => Promise<void>;
  login: (code: string, phone: string) => Promise<void>;
  logout: () => void;
  setIsAuthModalOpen: (isAuthModalOpen: boolean) => void;
  checkAuth: () => Promise<void>;
};

export type TAuthStore = TAuthState & TAuthActions;
