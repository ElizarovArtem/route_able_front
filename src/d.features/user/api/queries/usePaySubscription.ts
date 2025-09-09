import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  paySubscription,
  type PaySubscriptionResponse,
} from '../requests/pay-subscription.ts';

export const usePaySubscription = (
  mutationOptions?: MutationOptions<
    PaySubscriptionResponse,
    AxiosError,
    string
  >,
) => {
  return useMutation<PaySubscriptionResponse, AxiosError, string>({
    mutationFn: paySubscription,
    ...mutationOptions,
  });
};
