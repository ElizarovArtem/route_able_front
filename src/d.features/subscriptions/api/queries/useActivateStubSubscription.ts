import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  activateStubSubscription,
  type ActivateStubSubscriptionRequest,
  type ActivateStubSubscriptionResponse,
} from '@/d.features/subscriptions/api/requests/activate-stub-subscription.request.ts';

export const useActivateStubSubscription = (
  mutationOptions?: MutationOptions<
    ActivateStubSubscriptionResponse,
    AxiosError,
    ActivateStubSubscriptionRequest
  >,
) => {
  return useMutation<
    ActivateStubSubscriptionResponse,
    AxiosError,
    ActivateStubSubscriptionRequest
  >({
    mutationFn: activateStubSubscription,
    ...mutationOptions,
  });
};
