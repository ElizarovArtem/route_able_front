import type { TCreateFeedbackFormData } from '@/e.entities/feedback/model/resolvers/feedback.create-feedback-resolver.ts';
import { api } from '@/f.shared/api';

export const createFeedback = async (params: TCreateFeedbackFormData) => {
  const { data } = await api.post<null>(`/feedback`, params);

  return data;
};
