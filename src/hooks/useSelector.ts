import { useShallow } from 'zustand/react/shallow';

import { rootStore } from '@/store/rootStore.ts';
import type { TRootStore } from '@/types/store.ts';

export const useSelector = <T>(selector: (store: TRootStore) => T) => {
  return rootStore(useShallow(selector));
};
