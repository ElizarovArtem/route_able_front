import { useQuery } from '@tanstack/react-query';

import {
  getClientLessons,
  type GetClientLessonsParams,
  type GetClientLessonsResponse,
} from '@/e.entities/lessons/api/requests/get-client-lessons.request.ts';

export const useGetClientLessons = (date: GetClientLessonsParams['date']) => {
  return useQuery<GetClientLessonsResponse>({
    queryKey: ['client-lesson', date],
    queryFn: () => getClientLessons({ date: date as string }),
    enabled: Boolean(date),
    staleTime: 0,
  });
};
