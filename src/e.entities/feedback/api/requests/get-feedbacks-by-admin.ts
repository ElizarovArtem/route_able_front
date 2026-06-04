import type { Feedback } from '@/e.entities/feedback/model/feedback.types.ts';
import { api } from '@/f.shared/api';

type GetFeedbacksByAdminResponse = {
  items: Feedback[];
  skip: number;
  take: number;
  total: number;
};

export const getFeedbacksByAdmin = async () => {
  const { data } = await api.get<GetFeedbacksByAdminResponse>(`/feedback`);
  return data;
};
