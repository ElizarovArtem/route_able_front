import { useQuery } from '@tanstack/react-query';

import { getFeedbacksByAdmin } from '@/e.entities/feedback/api/requests/get-feedbacks-by-admin.ts';

export const useGetFeedbacksByAdmin = () => {
  return useQuery({
    queryKey: ['feedback by admin'],
    queryFn: () => getFeedbacksByAdmin(),
  });
};
