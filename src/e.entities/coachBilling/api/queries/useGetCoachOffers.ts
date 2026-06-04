import { useQuery } from '@tanstack/react-query';

import {
  getCoachOffers,
  type GetCoachOffersParams,
} from '@/e.entities/coachBilling/api/requests/get-coach-offers.request.ts';
import type { CoachOffer } from '@/e.entities/coachBilling/model/coachBilling.model.ts';

export const useGetCoachOffers = (
  coachId?: GetCoachOffersParams['coachId'],
) => {
  return useQuery<CoachOffer[]>({
    queryKey: ['coach-offers', coachId],
    queryFn: () => getCoachOffers({ coachId: coachId as string }),
    enabled: Boolean(coachId),
  });
};
