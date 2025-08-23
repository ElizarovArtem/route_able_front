import type { AxiosResponse } from 'axios';

import type { TCreateMealFormData } from '@/d.features/meal';
import { api } from '@/f.shared/api';

export type TGetAiPhotoMealSuggestionReq = FormData;

export const getAiPhotoMealSuggestion = async (
  data: TGetAiPhotoMealSuggestionReq,
): Promise<TCreateMealFormData> => {
  const response = await api.post<
    TGetAiPhotoMealSuggestionReq,
    AxiosResponse<TCreateMealFormData>
  >('/meals/analyzePhoto', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
