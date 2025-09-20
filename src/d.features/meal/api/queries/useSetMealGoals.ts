import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  setMealGoals,
  type SetMealGoalsRequest,
} from '../requests/set-meal-goals.ts';

export const useSetMealGoals = (
  mutationOptions?: MutationOptions<void, AxiosError, SetMealGoalsRequest>,
) => {
  return useMutation<void, AxiosError, SetMealGoalsRequest>({
    mutationFn: setMealGoals,
    ...mutationOptions,
  });
};
