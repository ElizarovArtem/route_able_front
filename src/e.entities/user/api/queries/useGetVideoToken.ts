import { useQuery } from '@tanstack/react-query';

import { getVideoToken } from '../requests/get-video-token.request.ts';

export const useGetVideoToken = (relationId?: string) => {
  return useQuery({
    queryKey: ['videoToken', relationId],
    queryFn: () => getVideoToken(relationId as string),
    enabled: Boolean(relationId),
    refetchOnWindowFocus: false,
  });
};
