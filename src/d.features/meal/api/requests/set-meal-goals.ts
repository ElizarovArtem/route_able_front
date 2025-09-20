import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type SetMealGoalsRequest = {
  relationId: string;
  goalCalories?: number;
  goalProtein?: number;
  goalFat?: number;
  goalCarbs?: number;
};

export const setMealGoals = async ({
  relationId,
  ...data
}: SetMealGoalsRequest) => {
  const response = await api.patch<SetMealGoalsRequest, AxiosResponse>(
    `/client-coach/${relationId}/nutrition-goals`,
    data,
  );

  return response.data;
};
