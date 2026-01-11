import { useQuery } from '@tanstack/react-query';

import {
  getRelation,
  type GetRelationResponse,
} from '../requests/get-user-by-id.request.ts';

export const useGetRelation = (partnerId: string, date?: string) => {
  return useQuery<GetRelationResponse>({
    queryKey: ['relation', 'with', partnerId, date],
    queryFn: () => getRelation(partnerId, date),
    staleTime: Infinity,
  });
};
