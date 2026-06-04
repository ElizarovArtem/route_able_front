import type { PaidPlan } from '@/e.entities/subscriptions/model/subscriptions.types.ts';
import { api } from '@/f.shared/api';

export const getPaidPlansRequest = async () => {
  const { data } = await api.get<PaidPlan[]>(`/subscriptions/plans`);

  return data;
};
