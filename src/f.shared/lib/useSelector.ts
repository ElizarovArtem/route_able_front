import { useShallow } from 'zustand/react/shallow';

import { store, type TRootStore } from '@/a.app/store/store.ts';

export const useSelector = <T>(selector: (store: TRootStore) => T) => {
  return store(useShallow(selector));
};
