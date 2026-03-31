import { useQuery } from '@tanstack/react-query';

import type { MyConnectionsItem } from '@/e.entities/user/model/user.types.ts';

import { getConnections } from '../requests/get-connections.request.ts';

export const useGetConnections = () => {
  return useQuery<MyConnectionsItem[]>({
    queryKey: ['connections'],
    queryFn: () => getConnections(),
    staleTime: Infinity,
  });
};
