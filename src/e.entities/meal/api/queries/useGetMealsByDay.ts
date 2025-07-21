import { useQuery } from '@tanstack/react-query';

import {
  getMealsByDaySummary,
  type TGetDayMealsSummaryRes,
} from '@/e.entities/meal';

export const useGetMealByDay = (date: string) => {
  return useQuery<TGetDayMealsSummaryRes>({
    queryKey: ['meals', date],
    queryFn: () => getMealsByDaySummary(date),
    enabled: !!date, // не запускаем без даты
    staleTime: 1000 * 60 * 5, // кэш на 5 минут
  });
};
