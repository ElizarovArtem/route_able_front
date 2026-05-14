import type {
  ChangeSubscriptionPlanRequest,
  ChangeSubscriptionPlanResponse,
} from '@/e.entities/subscriptions/model/subscriptions.types.api.ts';
import { api } from '@/f.shared/api';

export const changeSubscriptionPlan = async (
  payload: ChangeSubscriptionPlanRequest,
) => {
  const { data } = await api.post<ChangeSubscriptionPlanResponse>(
    `/subscriptions/change-plan`,
    payload,
  );

  return data;
};

export type { ChangeSubscriptionPlanRequest, ChangeSubscriptionPlanResponse };
