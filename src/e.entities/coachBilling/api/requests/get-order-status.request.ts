import type { Order } from '@/e.entities/coachBilling/model/coachBilling.model.ts';
import { api } from '@/f.shared/api';

export type GetCoachOffersParams = {
  orderId: string;
};

export const getOrderStatus = async ({ orderId }: GetCoachOffersParams) => {
  const { data } = await api.get<Order>(`/coach-orders/${orderId}`);

  return data;
};
