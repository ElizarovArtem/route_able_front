import type { Review } from '@/e.entities/review/model/review.model.ts';
import { api } from '@/f.shared/api';

export type GetCoachReviewsRequest = {
  coachId?: string;
};

export const getCoachReviews = async ({ coachId }: GetCoachReviewsRequest) => {
  const { data } = await api.get<Review[]>(`/reviews/${coachId}`);

  return data;
};
