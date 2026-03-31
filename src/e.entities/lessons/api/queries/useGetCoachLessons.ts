import { useQuery } from '@tanstack/react-query';

import {
  getCoachLessons,
  type GetCoachLessonsParams,
  type GetCoachLessonsResponse,
} from '@/e.entities/lessons/api/requests/get-coach-video-lessons.request.ts';

export const useGetCoachLessons = (date: GetCoachLessonsParams['date']) => {
  return useQuery<GetCoachLessonsResponse>({
    queryKey: ['coach-lesson', date],
    queryFn: () => getCoachLessons({ date: date as string }),
    enabled: Boolean(date),
    staleTime: 0,
  });
};
