import type { GetSubscriptionPaymentStatusResponse } from '@/e.entities/subscriptions/model/subscriptions.types.api.ts';
import { api } from '@/f.shared/api';

export const getSubscriptionPaymentStatusRequest = async (
  paymentId: string,
) => {
  const { data } = await api.get<GetSubscriptionPaymentStatusResponse>(
    `/subscriptions/payments/${paymentId}/status`,
  );

  return data;
};
