import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  createMealApi,
  type TCreateMealReq,
} from '@/d.features/meal/api/requests/add-meal.request.ts';

export const useAddMeal = (
  mutationOptions: MutationOptions<void, AxiosError, TCreateMealReq>,
) => {
  return useMutation<void, AxiosError, TCreateMealReq>({
    mutationFn: createMealApi,
    ...mutationOptions,
  });
};
