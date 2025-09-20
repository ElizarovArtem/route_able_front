import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type GetPlannedMealsRequest = {
  date: string;
  relationId?: string;
};

export type GetPlannedMealsResponse = {
  authorId: string;
  clientCoachId: string;
  clientId: string;
  coachId: string;
  createdAt: string;
  date: string;
  id: string;
  slot?: string;
  text: string;
  updatedAt: string;
}[];

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
