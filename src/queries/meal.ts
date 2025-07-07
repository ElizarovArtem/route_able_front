import { useQuery } from '@tanstack/react-query';

import { getMealsByDaySummary } from '@/api/meal.ts';
import type { TGetDayMealsSummaryRes } from '@/types/meal.ts';

export const useGetMealByDay = (date: string) => {
  return useQuery<TGetDayMealsSummaryRes>({
    queryKey: ['meals', date],
    queryFn: () => getMealsByDaySummary(date),
    enabled: !!date, // не запускаем без даты
    staleTime: 1000 * 60 * 5, // кэш на 5 минут
  });
};
