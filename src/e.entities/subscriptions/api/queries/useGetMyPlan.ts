import { useQuery } from '@tanstack/react-query';

import { getMyPlanRequest } from '@/e.entities/subscriptions/api/requests/get-my-plan.request.ts';
import type { GetMySubscriptionResponse } from '@/e.entities/subscriptions/model/subscriptions.types.api.ts';
import type { User } from '@/e.entities/user';

export const useGetMyPlan = (user?: User | null) => {
  return useQuery<GetMySubscriptionResponse>({
    queryKey: ['my-plan'],
    queryFn: () => getMyPlanRequest(),
    enabled: !!user,
  });
};
