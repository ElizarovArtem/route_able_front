import { useMutation } from '@tanstack/react-query';

import { createMeaApi } from '@/d.features/meal/api/requests/add-meal.request.ts';

export const useAddMeal = (onSuccessFn?: () => void) => {
  return useMutation({
    mutationFn: createMeaApi,
    onSuccess: onSuccessFn,
  });
};
