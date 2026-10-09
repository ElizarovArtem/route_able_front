import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

import type {
  GetPlannedMealsRequest,
  GetPlannedMealsResponse,
} from '../../model/meal.model.ts';

export type { GetPlannedMealsRequest, GetPlannedMealsResponse };

export const getPlannedMeals = async ({
  relationId,
  date,
}: GetPlannedMealsRequest) => {
  const response = await api.get<
    { date: string },
    AxiosResponse<GetPlannedMealsResponse>
  >(`/client-coach/${relationId}/planned-meals`, {
    params: { date },
  });

  return response.data;
};
