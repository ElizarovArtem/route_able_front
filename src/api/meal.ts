import type { TCreateMealReq } from '@/types/meal.ts';
import { api } from '@/utils/api.ts';

export const createMeaApi = async (data: TCreateMealReq) => {
  const response = await api.post('/meals', data);

  return response.data;
};

export const getMealsByDaySummary = async (date: string) => {
  const response = await api.get('/meals', {
    params: { date },
  });

  return response.data;
};
