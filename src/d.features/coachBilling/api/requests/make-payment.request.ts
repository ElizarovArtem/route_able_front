import { api } from '@/f.shared/api';

export type MakePaymentRequest = {
  orderId: string;
};

export type MakePaymentResponse = {
  paymentUrl: string;
  paymentExternalId: string;
};

export const makePayment = async ({ orderId }: MakePaymentRequest) => {
  const { data } = await api.post<MakePaymentResponse>(
    `/payments/orders/${orderId}/create`,
  );

  return data;
};
