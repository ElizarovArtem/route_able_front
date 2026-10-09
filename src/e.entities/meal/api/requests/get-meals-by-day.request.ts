import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

import type { DayMealsSummary } from '../../model/meal.model.ts';

export type GetDayMealsSummaryRes = DayMealsSummary;

export const getMealsByDaySummary = async (date: string) => {
  const response = await api.get<
    { date: string },
    AxiosResponse<GetDayMealsSummaryRes>
  >('/meals', {
    params: { date },
  });

  return response.data;
};
