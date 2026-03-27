import type { StateCreator } from 'zustand/index';

import type { TRootStore } from '@/a.app/store/store.ts';

// Types
export type TFeedbackState = {
  isFeedbackModalOpen: boolean;
};

export type TFeedbackActions = {
  setIsFeedbackModalOpen: (value: boolean) => void;
};

export type TFeedbackStore = TFeedbackState & TFeedbackActions;

export const createFeedbackSlice: StateCreator<
  TRootStore,
  [],
  [],
  TFeedbackStore
> = (setState) => ({
  isFeedbackModalOpen: false,
  setIsFeedbackModalOpen: (value: boolean) => {
    setState({ isFeedbackModalOpen: value });
  },
});

export const feedbackSelector = (store: TRootStore) => ({
  isFeedbackModalOpen: store.isFeedbackModalOpen,
  setIsFeedbackModalOpen: store.setIsFeedbackModalOpen,
});
