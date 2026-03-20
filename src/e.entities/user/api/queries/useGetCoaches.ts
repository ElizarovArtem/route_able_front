import { useQuery } from '@tanstack/react-query';

import type { CoachListItem } from '@/e.entities/user';
import { getCoaches } from '@/e.entities/user/api/requests/get-coaches.request.ts';

export const useGetCoaches = (userId?: string) => {
  return useQuery<CoachListItem[]>({
    queryKey: ['coaches for', userId ? userId : 'all'],
    queryFn: () => getCoaches(),
    retry: 1,
  });
};
