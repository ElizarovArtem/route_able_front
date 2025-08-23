import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { TCreateMealFormData } from '@/d.features/meal';
import {
  getAiMealSuggestion,
  type TGetAiMealSuggestionReq,
} from '@/e.entities/meal/api/requests/get-ai-meal-suggestion.request.ts';

export const useGetAiMealSuggestion = (
  mutationOptions?: MutationOptions<
    TCreateMealFormData,
    AxiosError,
    TGetAiMealSuggestionReq
  >,
) => {
  return useMutation<TCreateMealFormData, AxiosError, TGetAiMealSuggestionReq>({
    mutationFn: getAiMealSuggestion,
    ...mutationOptions,
  });
};
