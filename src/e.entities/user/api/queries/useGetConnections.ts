import { useQuery } from '@tanstack/react-query';

import {
  getConnections,
  type GetConnectionsResponse,
} from '@/e.entities/user/api/requests/get-connections.request.ts';

export const useGetConnections = () => {
  return useQuery<GetConnectionsResponse[]>({
    queryKey: ['connections'],
    queryFn: () => getConnections(),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
};
