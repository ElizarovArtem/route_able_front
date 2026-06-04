import { api } from '@/f.shared/api';

export type CreateCoachOfferRequest = {
  title: string;
  description?: string;
  sessionCount: number;
  price: number;
  currency?: string;
};

export const createCoachOffer = async ({
  ...payload
}: CreateCoachOfferRequest) => {
  const { data } = await api.post<null>(`/coach-offers`, payload);

  return data;
};
