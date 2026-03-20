import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  makePayment,
  type MakePaymentRequest,
  type MakePaymentResponse,
} from '@/d.features/coachBilling/api/requests/make-payment.request.ts';

export const useMakePayment = (
  mutationOptions?: MutationOptions<
    MakePaymentResponse,
    AxiosError,
    MakePaymentRequest
  >,
) => {
  return useMutation<MakePaymentResponse, AxiosError, MakePaymentRequest>({
    mutationFn: makePayment,
    ...mutationOptions,
  });
};
