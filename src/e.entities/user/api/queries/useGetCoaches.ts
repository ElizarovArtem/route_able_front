import { useQuery } from '@tanstack/react-query';

import type { User } from '@/e.entities/user';
import { getCoaches } from '@/e.entities/user/api/requests/get-coaches.request.ts';

export const useGetCoaches = () => {
  return useQuery<User[]>({
    queryKey: ['coaches'],
    queryFn: () => getCoaches(),
  });
};
