import { api } from '@/f.shared/api';

export type PaySubscriptionResponse = {
  ok: boolean;
};

export const paySubscription = async (linkId: string) => {
  return api.patch<null, PaySubscriptionResponse>(
    `/relations/${linkId}/activate`,
  );
};
