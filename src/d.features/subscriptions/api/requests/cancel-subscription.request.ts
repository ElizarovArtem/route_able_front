import type {
  CancelSubscriptionRequest,
  CancelSubscriptionResponse,
} from '@/e.entities/subscriptions/model/subscriptions.types.api.ts';
import { api } from '@/f.shared/api';

export const cancelSubscription = async (
  payload: CancelSubscriptionRequest,
) => {
  const { data } = await api.post<CancelSubscriptionResponse>(
    `/subscriptions/cancel`,
    payload,
  );

  return data;
};

export type { CancelSubscriptionRequest, CancelSubscriptionResponse };
