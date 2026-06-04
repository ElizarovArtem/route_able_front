import { api } from '@/f.shared/api';

export type CreateOrderRequest = {
  offerId: string;
};

export type CreateOrderResponse = {
  orderId: string;
};

export const createOrder = async ({ ...payload }: CreateOrderRequest) => {
  const { data } = await api.post<CreateOrderResponse>(
    `/coach-orders`,
    payload,
  );

  return data;
};
