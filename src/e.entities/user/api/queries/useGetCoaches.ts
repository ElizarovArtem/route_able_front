import { useQuery } from '@tanstack/react-query';

import type { CoachListItem } from '@/e.entities/user';
import { getCoaches } from '@/e.entities/user/api/requests/get-coaches.request.ts';

export const useGetCoaches = () => {
  return useQuery<CoachListItem[]>({
    queryKey: ['coaches'],
    queryFn: () => getCoaches(),
    retry: false,
  });
};
