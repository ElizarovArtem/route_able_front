import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type GetPlannedMealsRequest = {
  date: string;
  relationId?: string;
};

export type GetPlannedMealsResponse = {
  authorId: string;
  calories: number;
  carbs: number;
  clientCoachId: string;
  clientId: string;
  coachId: string;
  completedAt: string;
  createdAt: string;
  date: string;
  fat: number;
  id: string;
  isCompleted: false;
  protein: number;
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
