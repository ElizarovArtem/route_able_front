import type {
  CreateSubscriptionCheckoutRequest,
  CreateSubscriptionCheckoutResponse,
} from '@/e.entities/subscriptions/model/subscriptions.types.api.ts';
import { api } from '@/f.shared/api';

export const createSubscriptionCheckout = async (
  payload: CreateSubscriptionCheckoutRequest,
) => {
  const { data } = await api.post<CreateSubscriptionCheckoutResponse>(
    `/subscriptions/checkout`,
    payload,
  );

  return data;
};

export type {
  CreateSubscriptionCheckoutRequest,
  CreateSubscriptionCheckoutResponse,
};
