import { api } from '@/f.shared/api';

export type AddReviewRequest = {
  coachId: string;
  rating: string;
  review: string;
};

export const addReviewApi = async ({ coachId, ...data }: AddReviewRequest) => {
  const response = await api.post(`/reviews/${coachId}`, data);

  return response.data;
};
