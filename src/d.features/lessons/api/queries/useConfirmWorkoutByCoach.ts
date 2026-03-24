import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  confirmWorkoutByCoach,
  type ConfirmWorkoutByCoachRequest,
} from '@/d.features/lessons/api/requests/confirm-workout-by-coach.request.ts';

export const useConfirmWorkoutByCoach = (
  mutationOptions?: MutationOptions<
    void,
    AxiosError,
    ConfirmWorkoutByCoachRequest
  >,
) => {
  return useMutation<void, AxiosError, ConfirmWorkoutByCoachRequest>({
    mutationFn: confirmWorkoutByCoach,
    ...mutationOptions,
  });
};
