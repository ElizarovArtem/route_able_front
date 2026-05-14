import type {
  ActivateStubSubscriptionRequest,
  ActivateStubSubscriptionResponse,
} from '@/e.entities/subscriptions/model/subscriptions.types.api.ts';
import { api } from '@/f.shared/api';

export const activateStubSubscription = async (
  payload: ActivateStubSubscriptionRequest,
) => {
  const { data } = await api.post<ActivateStubSubscriptionResponse>(
    `/subscriptions/stub/activate`,
    payload,
  );

  return data;
};

export type {
  ActivateStubSubscriptionRequest,
  ActivateStubSubscriptionResponse,
};
