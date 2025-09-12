import { useQuery } from '@tanstack/react-query';

import {
  getConnections,
  type GetConnectionsResponseItem,
} from '../requests/get-connections.request.ts';

export const useGetConnections = () => {
  return useQuery<GetConnectionsResponseItem[]>({
    queryKey: ['connections'],
    queryFn: () => getConnections(),
    staleTime: Infinity,
  });
};
