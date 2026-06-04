import { useQuery } from '@tanstack/react-query';

import {
  getCoachReviews,
  type GetCoachReviewsRequest,
} from '@/e.entities/review/api/requests/get-coach-reviews.request.ts';
import type { Review } from '@/e.entities/review/model/review.model.ts';

export const useGetCoachReviews = (
  coachId?: GetCoachReviewsRequest['coachId'],
) => {
  return useQuery<Review[]>({
    queryKey: ['reviews', coachId],
    queryFn: () => getCoachReviews({ coachId }),
    enabled: Boolean(coachId),
  });
};
