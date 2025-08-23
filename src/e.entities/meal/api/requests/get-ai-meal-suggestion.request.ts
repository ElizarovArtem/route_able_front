import type { AxiosResponse } from 'axios';

import type { TCreateMealFormData } from '@/d.features/meal';
import { api } from '@/f.shared/api';

export type TGetAiMealSuggestionReq = string;

export const getAiMealSuggestion = async (
  text: string,
): Promise<TCreateMealFormData> => {
  const response = await api.post<
    TGetAiMealSuggestionReq,
    AxiosResponse<TCreateMealFormData>
  >('/meals/analyze', { text });

  return response.data;
};
