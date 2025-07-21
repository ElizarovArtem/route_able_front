import type { TMeal } from '@/e.entities/meal';
import { api } from '@/f.shared/api';

export type TCreateMealReq = Partial<Omit<TMeal, 'date' | 'name' | 'id'>> & {
  date: string;
  name: string;
};

export const createMeaApi = async (data: TCreateMealReq) => {
  const response = await api.post('/meals', data);

  return response.data;
};
