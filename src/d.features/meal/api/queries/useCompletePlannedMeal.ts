import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  completePlannedMealApi,
  type CompletePlannedMealRequest,
} from '@/d.features/meal/api/requests/complete-planned-meal.ts';

export const useCompletePlannedMeal = (
  mutationOptions?: MutationOptions<
    void,
    AxiosError,
    CompletePlannedMealRequest
  >,
) => {
  return useMutation<void, AxiosError, CompletePlannedMealRequest>({
    mutationFn: completePlannedMealApi,
    ...mutationOptions,
  });
};
