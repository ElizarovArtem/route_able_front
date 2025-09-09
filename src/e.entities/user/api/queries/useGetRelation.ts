import { useQuery } from '@tanstack/react-query';

import {
  getRelation,
  type GetRelationResponse,
} from '../requests/get-user-by-id.request.ts';

export const useGetRelation = (partnerId: string) => {
  return useQuery<GetRelationResponse>({
    queryKey: ['relation', 'with', partnerId],
    queryFn: () => getRelation(partnerId),
    staleTime: Infinity,
  });
};
