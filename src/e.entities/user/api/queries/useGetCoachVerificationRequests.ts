import { useQuery } from '@tanstack/react-query';

import { getCoachVerificationRequests } from '@/e.entities/user/api/requests/get-coach-verification-requests.request.ts';
import type { CoachVerificationRequest } from '@/e.entities/user/model/user.types.ts';

export const useGetCoachVerificationRequests = () => {
  return useQuery<CoachVerificationRequest[]>({
    queryKey: ['coachVerifications'],
    queryFn: () => getCoachVerificationRequests(),
  });
};
