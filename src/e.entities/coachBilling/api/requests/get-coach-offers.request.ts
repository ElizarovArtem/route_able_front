import type { CoachOffer } from '@/e.entities/coachBilling/model/coachBilling.model.ts';
import { api } from '@/f.shared/api';

export type GetCoachOffersParams = {
  coachId: string;
};

export const getCoachOffers = async ({ coachId }: GetCoachOffersParams) => {
  const { data } = await api.get<CoachOffer[]>(
    `/coach-offers/coach/${coachId}`,
  );

  return data;
};
