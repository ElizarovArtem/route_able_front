import { useQuery } from '@tanstack/react-query';

import {
  type GetCoachVideoLesson,
  getCoachVideoLessons,
  type GetCoachVideoLessonsParams,
} from '@/e.entities/lessons/api/requests/get-coach-video-lessons.request.ts';

export const useGetCoachVideoLessons = (
  date: GetCoachVideoLessonsParams['date'],
) => {
  return useQuery<GetCoachVideoLesson[]>({
    queryKey: ['coach-video-lesson', date],
    queryFn: () => getCoachVideoLessons({ date: date as string }),
    enabled: Boolean(date),
    staleTime: 0,
  });
};
