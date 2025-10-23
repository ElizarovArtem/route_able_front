import { useQuery } from '@tanstack/react-query';

import { getVideoToken } from '../requests/get-video-token.request.ts';

type UseGetVideoTokenOptions = {
  enabled?: boolean;
};

export const useGetVideoToken = (
  relationId?: string,
  options: UseGetVideoTokenOptions = {},
) => {
  return useQuery({
    queryKey: ['videoToken', relationId],
    queryFn: () => getVideoToken(relationId as string),
    enabled: Boolean(relationId) && (options.enabled ?? true),
    refetchOnWindowFocus: false,
  });
};
