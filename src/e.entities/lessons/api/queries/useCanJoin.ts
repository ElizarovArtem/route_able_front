import { useQuery } from '@tanstack/react-query';

import { NOW_REFRESH_MS } from '@/c.widgets/lessons/model/videoLessons.constants.ts';
import { getCanJoin } from '@/e.entities/lessons/api/requests/get-can-join.request.ts';

export const useCanJoin = (relationId?: string) => {
  return useQuery({
    queryKey: ['canJoin', relationId],
    queryFn: () => getCanJoin(relationId as string),
    enabled: Boolean(relationId),
    staleTime: NOW_REFRESH_MS,
  });
};
