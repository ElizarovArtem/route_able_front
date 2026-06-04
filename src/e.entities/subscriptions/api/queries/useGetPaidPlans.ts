import { useQuery } from '@tanstack/react-query';

import { getPaidPlansRequest } from '@/e.entities/subscriptions/api/requests/get-paid-plans.request.ts';
import type { PaidPlan } from '@/e.entities/subscriptions/model/subscriptions.types.ts';

export const useGetPaidPlans = () => {
  return useQuery<PaidPlan[]>({
    queryKey: ['paid-plans'],
    queryFn: () => getPaidPlansRequest(),
  });
};
