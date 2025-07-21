import type { AxiosResponse } from 'axios';

import type { TMeal } from '@/e.entities/meal';
import { api } from '@/f.shared/api';

export type TGetDayMealsSummaryRes = {
  date: string;
  summary: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  meals: TMeal[];
};

export const getMealsByDaySummary = async (date: string) => {
  const response = await api.get<
    { date: string },
    AxiosResponse<TGetDayMealsSummaryRes>
  >('/meals', {
    params: { date },
  });

  return response.data;
};
