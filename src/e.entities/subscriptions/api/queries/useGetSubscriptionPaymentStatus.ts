import { useQuery } from '@tanstack/react-query';

import { getSubscriptionPaymentStatusRequest } from '@/e.entities/subscriptions/api/requests/get-subscription-payment-status.request.ts';
import { SubscriptionPaymentStatus } from '@/e.entities/subscriptions/model/subscriptions.constants.ts';
import type { GetSubscriptionPaymentStatusResponse } from '@/e.entities/subscriptions/model/subscriptions.types.api.ts';

export const useGetSubscriptionPaymentStatus = (paymentId?: string | null) => {
  return useQuery<GetSubscriptionPaymentStatusResponse>({
    queryKey: ['subscription-payment-status', paymentId],
    queryFn: () => getSubscriptionPaymentStatusRequest(paymentId as string),
    enabled: !!paymentId,
    refetchInterval: (query) => {
      const paymentStatus = query.state.data?.paymentStatus;

      if (!paymentStatus) return 2000;

      if (
        paymentStatus === SubscriptionPaymentStatus.SUCCEEDED ||
        paymentStatus === SubscriptionPaymentStatus.FAILED ||
        paymentStatus === SubscriptionPaymentStatus.CANCELED ||
        paymentStatus === SubscriptionPaymentStatus.REFUNDED
      ) {
        return false;
      }

      return 2000;
    },
    refetchIntervalInBackground: false,
  });
};
