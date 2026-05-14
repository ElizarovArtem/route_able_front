import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  createSubscriptionCheckout,
  type CreateSubscriptionCheckoutRequest,
  type CreateSubscriptionCheckoutResponse,
} from '@/d.features/subscriptions/api/requests/create-subscription-checkout.request.ts';

export const useCreateSubscriptionCheckout = (
  mutationOptions?: MutationOptions<
    CreateSubscriptionCheckoutResponse,
    AxiosError,
    CreateSubscriptionCheckoutRequest
  >,
) => {
  return useMutation<
    CreateSubscriptionCheckoutResponse,
    AxiosError,
    CreateSubscriptionCheckoutRequest
  >({
    mutationFn: createSubscriptionCheckout,
    ...mutationOptions,
  });
};
