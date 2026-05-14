import type { GetMySubscriptionResponse } from '@/e.entities/subscriptions/model/subscriptions.types.api.ts';
import { api } from '@/f.shared/api';

export const getMyPlanRequest = async () => {
  const { data } =
    await api.get<GetMySubscriptionResponse>(`/subscriptions/me`);

  return data;
};
