import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  addPlannedMealApi,
  type AddPlannedMealRequest,
} from '../requests/add-planned-meal';

export const useAddPlannedMeal = (
  mutationOptions?: MutationOptions<void, AxiosError, AddPlannedMealRequest>,
) => {
  return useMutation<void, AxiosError, AddPlannedMealRequest>({
    mutationFn: addPlannedMealApi,
    ...mutationOptions,
  });
};
