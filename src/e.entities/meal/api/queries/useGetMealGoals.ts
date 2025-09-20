import { useQuery } from '@tanstack/react-query';

import {
  getMealGoals,
  type GetMealGoalsRequest,
  type GetMealGoalsResponse,
} from '../requests/get-meal-goals.request.ts';

export const useGetMealGoals = ({ relationId }: GetMealGoalsRequest) => {
  return useQuery<GetMealGoalsResponse>({
    queryKey: ['mealGoals', relationId],
    queryFn: () => getMealGoals({ relationId }),
    staleTime: 1000 * 60 * 5, // кэш на 5 минут
    enabled: !!relationId,
  });
};
