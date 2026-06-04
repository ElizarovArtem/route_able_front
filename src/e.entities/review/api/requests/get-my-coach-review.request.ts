import type { Review } from '@/e.entities/review/model/review.model.ts';
import { api } from '@/f.shared/api';

export type GetMyCoachReviewRequest = {
  coachId?: string;
};

export const getMyCoachReview = async ({
  coachId,
}: GetMyCoachReviewRequest) => {
  const { data } = await api.get<Review>(`/reviews/${coachId}/my`);

  return data;
};
