import type { AxiosResponse } from 'axios';

import type { TMeal } from '@/e.entities/meal';
import { api } from '@/f.shared/api';

export type GetDayMealsSummaryRes = {
  date: string;
  summary: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  meals: TMeal[];
  goals: {
    personal: {
      calories: number;
      carbs: number;
      fat: number;
      protein: number;
    };
    coaches: {
      clientCoachId: string;
      coachId: string;
      coachName: string;
      calories: number;
      protein: number;
      fat: number;
      carbs: number;
    }[];
  };
};

export const getMealsByDaySummary = async (date: string) => {
  const response = await api.get<
    { date: string },
    AxiosResponse<GetDayMealsSummaryRes>
  >('/meals', {
    params: { date },
  });

  return response.data;
};
