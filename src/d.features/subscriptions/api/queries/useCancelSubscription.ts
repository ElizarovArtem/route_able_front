import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  cancelSubscription,
  type CancelSubscriptionRequest,
  type CancelSubscriptionResponse,
} from '@/d.features/subscriptions/api/requests/cancel-subscription.request.ts';

export const useCancelSubscription = (
  mutationOptions?: MutationOptions<
    CancelSubscriptionResponse,
    AxiosError,
    CancelSubscriptionRequest
  >,
) => {
  return useMutation<
    CancelSubscriptionResponse,
    AxiosError,
    CancelSubscriptionRequest
  >({
    mutationFn: cancelSubscription,
    ...mutationOptions,
  });
};
