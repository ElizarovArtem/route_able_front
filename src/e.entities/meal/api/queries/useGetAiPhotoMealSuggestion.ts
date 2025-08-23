import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { TCreateMealFormData } from '@/d.features/meal';

import {
  getAiPhotoMealSuggestion,
  type TGetAiPhotoMealSuggestionReq,
} from '../requests/get-ai-photo-meal-suggestion.request.ts';

export const useGetAiPhotoMealSuggestion = (
  mutationOptions?: MutationOptions<
    TCreateMealFormData,
    AxiosError,
    TGetAiPhotoMealSuggestionReq
  >,
) => {
  return useMutation<
    TCreateMealFormData,
    AxiosError,
    TGetAiPhotoMealSuggestionReq
  >({
    mutationFn: getAiPhotoMealSuggestion,
    ...mutationOptions,
  });
};
