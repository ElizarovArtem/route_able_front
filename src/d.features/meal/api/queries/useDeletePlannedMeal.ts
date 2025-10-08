import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  deletePlannedMealApi,
  type DeletePlannedMealRequest,
} from '../requests/delete-planned-meal';

export const useDeletePlannedMeal = (
  mutationOptions?: MutationOptions<void, AxiosError, DeletePlannedMealRequest>,
) => {
  return useMutation<void, AxiosError, DeletePlannedMealRequest>({
    mutationFn: deletePlannedMealApi,
    ...mutationOptions,
  });
};
