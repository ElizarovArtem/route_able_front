import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  createCoachOffer,
  type CreateCoachOfferRequest,
} from '@/d.features/coachBilling/api/requests/create-coach-offer.request.ts';

export const useCreateCoachOffer = (
  mutationOptions?: MutationOptions<null, AxiosError, CreateCoachOfferRequest>,
) => {
  return useMutation<null, AxiosError, CreateCoachOfferRequest>({
    mutationFn: createCoachOffer,
    ...mutationOptions,
  });
};
