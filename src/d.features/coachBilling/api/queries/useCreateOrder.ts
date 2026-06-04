import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  createOrder,
  type CreateOrderRequest,
  type CreateOrderResponse,
} from '@/d.features/coachBilling/api/requests/create-order.request.ts';

export const useCreateOrder = (
  mutationOptions?: MutationOptions<
    CreateOrderResponse,
    AxiosError,
    CreateOrderRequest
  >,
) => {
  return useMutation<CreateOrderResponse, AxiosError, CreateOrderRequest>({
    mutationFn: createOrder,
    ...mutationOptions,
  });
};
