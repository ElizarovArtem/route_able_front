import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type GetMealGoalsRequest = {
  relationId?: string;
};

export type GetMealGoalsResponse = {
  relationId: string;
  goals: {
    goalCalories: number;
    goalProtein: number;
    goalFat: number;
    goalCarbs: number;
  };
};

export const getMealGoals = async ({ relationId }: GetMealGoalsRequest) => {
  const response = await api.get<null, AxiosResponse<GetMealGoalsResponse>>(
    `/client-coach/${relationId}/nutrition-goals`,
  );

  return response.data;
};
