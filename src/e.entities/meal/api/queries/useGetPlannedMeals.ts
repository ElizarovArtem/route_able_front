import { useQuery } from '@tanstack/react-query';

import {
  getPlannedMeals,
  type GetPlannedMealsRequest,
  type GetPlannedMealsResponse,
} from '../requests/get-planned-meals.request';

export const useGetPlannedMeals = ({
  date,
  relationId,
}: GetPlannedMealsRequest) => {
  return useQuery<GetPlannedMealsResponse>({
    queryKey: ['plannedMeals', relationId, date],
    queryFn: () => getPlannedMeals({ date, relationId }),
    staleTime: 1000 * 60 * 5, // кэш на 5 минут
    enabled: Boolean(date && relationId),
  });
};
