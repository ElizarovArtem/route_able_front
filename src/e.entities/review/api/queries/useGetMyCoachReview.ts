import { useQuery } from '@tanstack/react-query';

import {
  getMyCoachReview,
  type GetMyCoachReviewRequest,
} from '@/e.entities/review/api/requests/get-my-coach-review.request.ts';
import type { Review } from '@/e.entities/review/model/review.model.ts';

export const useGetMyCoachReview = (
  coachId?: GetMyCoachReviewRequest['coachId'],
) => {
  return useQuery<Review>({
    queryKey: ['myReview', coachId],
    queryFn: () => getMyCoachReview({ coachId }),
    enabled: Boolean(coachId),
  });
};
