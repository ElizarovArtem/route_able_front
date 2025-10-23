import { useQuery } from '@tanstack/react-query';

import { getVideoLessons } from '../requests/get-video-lessons.request.ts';

export const useGetVideoLessons = (relationId?: string) => {
  return useQuery({
    queryKey: ['videoLessons', relationId],
    queryFn: () => getVideoLessons(relationId as string),
    enabled: Boolean(relationId),
    refetchOnWindowFocus: false,
  });
};
