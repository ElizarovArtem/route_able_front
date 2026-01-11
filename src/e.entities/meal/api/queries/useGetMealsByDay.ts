import { useQuery } from '@tanstack/react-query';

import {
  type GetDayMealsSummaryRes,
  getMealsByDaySummary,
} from '@/e.entities/meal';

export const useGetMealByDay = (date: string) => {
  return useQuery<GetDayMealsSummaryRes>({
    queryKey: ['meals', date],
    queryFn: () => getMealsByDaySummary(date),
    enabled: !!date, // не запускаем без даты
    staleTime: 1000 * 60 * 5, // кэш на 5 минут
  });
};
