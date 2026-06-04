import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  changeSubscriptionPlan,
  type ChangeSubscriptionPlanRequest,
  type ChangeSubscriptionPlanResponse,
} from '@/d.features/subscriptions/api/requests/change-subscription-plan.request.ts';

export const useChangeSubscriptionPlan = (
  mutationOptions?: MutationOptions<
    ChangeSubscriptionPlanResponse,
    AxiosError,
    ChangeSubscriptionPlanRequest
  >,
) => {
  return useMutation<
    ChangeSubscriptionPlanResponse,
    AxiosError,
    ChangeSubscriptionPlanRequest
  >({
    mutationFn: changeSubscriptionPlan,
    ...mutationOptions,
  });
};
